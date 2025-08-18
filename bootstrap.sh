#!/bin/bash

set -e

echo "🏗️  Bootstrap GitHub OIDC and Terraform State"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    print_error "AWS credentials not configured. Please run 'aws configure' first."
    exit 1
fi

print_status "Setting up GitHub OIDC provider and IAM role..."

cd terraform/bootstrap

# Initialize and apply bootstrap
terraform init
terraform plan
terraform apply -auto-approve

# Get outputs
ROLE_ARN=$(terraform output -raw github_actions_role_arn)
ACCOUNT_ID=$(terraform output -raw aws_account_id)
STATE_BUCKET=$(terraform output -raw terraform_state_bucket)

cd ../..

print_success "Bootstrap complete!"
echo ""
print_status "🔧 Configuration Summary:"
echo "========================="
echo "GitHub Actions Role ARN: $ROLE_ARN"
echo "AWS Account ID: $ACCOUNT_ID"
echo "Terraform State Bucket: $STATE_BUCKET"
echo ""

print_warning "⚙️  GitHub Repository Setup Required:"
echo "======================================"
echo ""
print_status "1. Go to your GitHub repository: https://github.com/tydanielson/tydanielson.github.io"
echo ""
print_status "2. Navigate to Settings → Secrets and variables → Actions"
echo ""
print_status "3. Add the following Repository Secret:"
echo "   Name: AWS_ACCOUNT_ID"
echo "   Value: $ACCOUNT_ID"
echo ""
print_status "4. (Optional) Add Repository Variable for custom role ARN:"
echo "   Name: AWS_ROLE_ARN"
echo "   Value: $ROLE_ARN"
echo ""

print_warning "🚀 Deployment Instructions:"
echo "============================"
echo ""
print_status "1. Commit and push your changes to trigger the GitHub Actions workflow"
echo "2. The workflow will use OIDC to assume the IAM role automatically"
echo "3. No more AWS access keys needed!"
echo ""

print_success "✅ Ready for OIDC-based deployment!"
print_status "Next: git add . && git commit -m 'Add OIDC deployment' && git push"
