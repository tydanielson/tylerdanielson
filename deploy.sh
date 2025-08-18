#!/bin/bash

set -e

echo "🚀 Portfolio Website Deployment Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    if ! command -v terraform &> /dev/null; then
        print_error "Terraform is not installed. Please install it first."
        exit 1
    fi
    
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install it first."
        exit 1
    fi
    
    # Check AWS credentials
    if ! aws sts get-caller-identity &> /dev/null; then
        print_error "AWS credentials not configured. Please run 'aws configure' first."
        exit 1
    fi
    
    print_success "All requirements met!"
}

# Initialize Terraform
init_terraform() {
    print_status "Initializing Terraform..."
    cd terraform
    terraform init
    print_success "Terraform initialized!"
}

# Plan deployment
plan_deployment() {
    print_status "Planning deployment..."
    terraform plan -out=tfplan
    print_success "Deployment plan created!"
}

# Apply deployment
apply_deployment() {
    print_status "Applying deployment..."
    terraform apply tfplan
    print_success "Infrastructure deployed!"
    
    # Get outputs
    print_status "Getting deployment outputs..."
    BUCKET_NAME=$(terraform output -raw website_bucket_name)
    CLOUDFRONT_ID=$(terraform output -raw cloudfront_distribution_id)
    WEBSITE_URL=$(terraform output -raw website_url)
    STATE_BUCKET=$(terraform output -raw terraform_state_bucket_name)
    
    echo ""
    print_success "Deployment Complete!"
    echo "========================"
    echo "Website Bucket: $BUCKET_NAME"
    echo "CloudFront ID: $CLOUDFRONT_ID"
    echo "Website URL: $WEBSITE_URL"
    echo "State Bucket: $STATE_BUCKET"
    echo ""
}

# Build and deploy website
deploy_website() {
    print_status "Building website..."
    cd ..
    npm run build
    
    print_status "Uploading to S3..."
    aws s3 sync dist/ s3://$BUCKET_NAME/ --delete
    
    print_status "Invalidating CloudFront cache..."
    aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"
    
    print_success "Website deployed to $WEBSITE_URL"
}

# Setup remote state (after initial deployment)
setup_remote_state() {
    print_status "Setting up remote state backend..."
    
    # Get the state bucket name
    STATE_BUCKET=$(terraform output -raw terraform_state_bucket_name)
    
    # Backup current state
    cp terraform.tfstate terraform.tfstate.backup
    
    # Update main.tf to use remote backend
    sed -i.bak 's/# backend "s3"/backend "s3"/' main.tf
    sed -i.bak "s/tydanielson-terraform-state/$STATE_BUCKET/" main.tf
    
    # Reinitialize with remote backend
    terraform init -migrate-state
    
    print_success "Remote state backend configured!"
    print_warning "Local state backed up to terraform.tfstate.backup"
}

# Main deployment flow
main() {
    echo ""
    print_status "Starting deployment process..."
    
    check_requirements
    
    # Check if terraform.tfvars exists
    if [ ! -f "terraform/terraform.tfvars" ]; then
        print_error "terraform.tfvars not found!"
        print_status "Please copy terraform.tfvars.example to terraform.tfvars and update with your values"
        exit 1
    fi
    
    init_terraform
    plan_deployment
    
    read -p "$(echo -e ${YELLOW}Do you want to proceed with deployment? [y/N]:${NC} )" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        apply_deployment
        
        read -p "$(echo -e ${YELLOW}Do you want to deploy the website now? [y/N]:${NC} )" -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            deploy_website
        fi
        
        read -p "$(echo -e ${YELLOW}Do you want to setup remote state backend now? [y/N]:${NC} )" -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            setup_remote_state
        fi
    else
        print_status "Deployment cancelled."
    fi
}

# Parse command line arguments
case "${1:-}" in
    "plan")
        check_requirements
        init_terraform
        plan_deployment
        ;;
    "apply")
        check_requirements
        init_terraform
        apply_deployment
        ;;
    "deploy")
        if [ -z "$BUCKET_NAME" ] || [ -z "$CLOUDFRONT_ID" ]; then
            print_error "Infrastructure not deployed yet. Run full deployment first."
            exit 1
        fi
        deploy_website
        ;;
    "destroy")
        print_warning "This will destroy all infrastructure!"
        read -p "$(echo -e ${RED}Are you sure? Type 'yes' to confirm:${NC} )" -r
        if [[ $REPLY == "yes" ]]; then
            cd terraform
            terraform destroy
        fi
        ;;
    *)
        main
        ;;
esac
