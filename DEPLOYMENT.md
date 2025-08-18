# Portfolio Website Deployment

This repository contains a React portfolio website with automated AWS deployment via GitHub Actions using OIDC (OpenID Connect) for secure, keyless authentication.

## 🏗️ Infrastructure

The deployment uses:
- **S3** for static website hosting
- **CloudFront** for global CDN
- **Route53** for DNS management
- **ACM** for SSL certificates
- **Terraform** for infrastructure as code
- **GitHub Actions** for CI/CD with OIDC authentication
- **IAM OIDC Provider** for secure, keyless GitHub Actions authentication

## 🚀 Quick Start

### 1. Prerequisites

- AWS account with appropriate permissions
- Domain managed in Route53
- AWS CLI configured with admin access (for initial bootstrap)

### 2. Bootstrap Setup (One-time)

Run the bootstrap script to create the OIDC provider and initial IAM role:

```bash
chmod +x bootstrap.sh
./bootstrap.sh
```

This creates:
- GitHub OIDC identity provider
- IAM role with admin access for GitHub Actions
- Terraform state S3 bucket

### 3. GitHub Repository Configuration

The bootstrap script will output the required GitHub configuration:

1. **Go to Repository Settings** → Secrets and variables → Actions

2. **Add Repository Secret:**
   ```
   Name: AWS_ACCOUNT_ID
   Value: [your-account-id-from-bootstrap]
   ```

3. **(Optional) Add Repository Variable for custom role:**
   ```
   Name: AWS_ROLE_ARN
   Value: [role-arn-from-bootstrap]
   ```

### 4. Deploy

Push to main/master branch to trigger automatic deployment:

```bash
git add .
git commit -m "Add OIDC deployment setup"
git push origin main
```

## 🔧 Manual Deployment

If you prefer manual deployment:

```bash
# Assume the GitHub Actions role (if you have access)
aws sts assume-role-with-web-identity \
  --role-arn arn:aws:iam::ACCOUNT:role/GitHubActions-Bootstrap-tydanielson.github.io \
  --role-session-name manual-deployment \
  --web-identity-token [github-token]

# Navigate to terraform directory
cd terraform

# Initialize Terraform
terraform init

# Plan deployment
terraform plan

# Apply changes
terraform apply

# Build and deploy website
cd ..
npm run build
aws s3 sync dist/ s3://your-bucket-name/ --delete
aws cloudfront create-invalidation --distribution-id your-distribution-id --paths "/*"
```

## 📁 Project Structure

```
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions workflow
├── terraform/
│   ├── bootstrap/          # Initial state bucket setup
│   ├── main.tf            # Main Terraform configuration
│   ├── variables.tf       # Variable definitions
│   ├── s3.tf             # S3 bucket configuration
│   ├── cloudfront.tf     # CloudFront distribution
│   ├── route53.tf        # DNS records
│   ├── locals.tf         # Local values
│   ├── outputs.tf        # Output values
│   └── terraform.tfvars  # Configuration values
├── src/                   # React application source
├── bootstrap.sh          # State bucket setup script
└── deploy.sh            # Legacy deployment script
```

## 🔄 GitHub Actions Workflow

The workflow automatically:

1. **Infrastructure**: Deploys/updates AWS infrastructure with Terraform
2. **Build**: Compiles the React application
3. **Deploy**: Syncs files to S3 with optimized caching
4. **Invalidate**: Clears CloudFront cache for immediate updates

### Workflow Triggers

- Push to main/master branch
- Manual trigger via GitHub Actions UI
- Pull requests (plan only, no deployment)

## 🛠️ Configuration

### Terraform Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `domain_name` | Your domain name | Required |
| `subdomain` | Subdomain (empty for root) | `""` |
| `aws_region` | AWS region | `us-east-1` |
| `environment` | Environment name | `production` |
| `price_class` | CloudFront price class | `PriceClass_100` |

### AWS Permissions

The bootstrap creates an admin role for initial setup. The production role has these specific permissions:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:*",
                "cloudfront:*",
                "route53:GetHostedZone",
                "route53:ListHostedZones",
                "route53:ChangeResourceRecordSets",
                "route53:GetChange",
                "acm:*",
                "iam:GetRole",
                "iam:GetPolicy",
                "sts:GetCallerIdentity"
            ],
            "Resource": "*"
        }
    ]
}
```

## 🔒 Security Features

- **OIDC Authentication**: No long-lived AWS access keys in GitHub
- **Principle of Least Privilege**: Production role has minimal required permissions
- **Repository-scoped**: OIDC role can only be assumed by your specific repository
- **S3 Private Buckets**: CloudFront serves content, S3 buckets are private
- **HTTPS Enforced**: All traffic redirected to HTTPS
- **Modern TLS**: Only TLS 1.2+ supported
- **Terraform State Encryption**: State files encrypted at rest
- **Infrastructure as Code**: All changes auditable through Git

## 🚨 Troubleshooting

### Common Issues

1. **Certificate validation fails**: Ensure Route53 zone exists and is active
2. **Terraform state conflicts**: Use consistent state bucket across environments
3. **Build failures**: Check Node.js version compatibility
4. **Deployment timeouts**: CloudFront distributions take 15-20 minutes to deploy

### Debug Commands

```bash
# Check Terraform state
terraform show

# Validate configuration
terraform validate

# View CloudFront distribution status
aws cloudfront get-distribution --id your-distribution-id

# Check S3 bucket contents
aws s3 ls s3://your-bucket-name/
```

## 🔄 Updates and Maintenance

- **Code changes**: Push to main branch triggers automatic deployment
- **Infrastructure changes**: Modify Terraform files and push
- **Domain changes**: Update `terraform.tfvars` and redeploy
- **SSL renewal**: ACM handles automatic renewal

## 💰 Cost Optimization

The current setup uses:
- S3 Standard storage
- CloudFront PriceClass_100 (US/EU only)
- Route53 hosted zone
- ACM certificates (free)

Estimated monthly cost: $1-5 for typical portfolio traffic.

## 📞 Support

For issues:
1. Check GitHub Actions logs
2. Review Terraform plan output
3. Verify AWS permissions
4. Check domain/DNS configuration
