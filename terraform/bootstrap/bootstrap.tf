terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

variable "github_org" {
  description = "GitHub organization or username"
  type        = string
  default     = "tydanielson"
}

variable "github_repo_name" {
  description = "GitHub repository name"
  type        = string
  default     = "tylerdanielson"
}

# OIDC Provider for GitHub Actions
resource "aws_iam_openid_connect_provider" "github_actions" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com",
  ]

  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1",
    "1c58a3a8518e8759bf075b76b750d4f2df264fcd"
  ]

  tags = {
    Name = "GitHub Actions OIDC Provider"
  }
}

# IAM Role for GitHub Actions (Admin access for initial setup)
resource "aws_iam_role" "github_actions_bootstrap" {
  name = "GitHubActions-Bootstrap-${var.github_repo_name}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github_actions.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_org}/${var.github_repo_name}:*"
          }
        }
      }
    ]
  })

  tags = {
    Name = "GitHub Actions Bootstrap Role for ${var.github_repo_name}"
  }
}

# Attach AdministratorAccess policy for initial setup
resource "aws_iam_role_policy_attachment" "github_actions_admin" {
  role       = aws_iam_role.github_actions_bootstrap.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

# Terraform State S3 Bucket
resource "aws_s3_bucket" "terraform_state_bootstrap" {
  bucket = "tydanielson-terraform-state-github"
  
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "terraform_state_bootstrap" {
  bucket = aws_s3_bucket.terraform_state_bootstrap.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state_bootstrap" {
  bucket = aws_s3_bucket.terraform_state_bootstrap.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "terraform_state_bootstrap" {
  bucket = aws_s3_bucket.terraform_state_bootstrap.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Outputs
output "github_actions_role_arn" {
  description = "ARN of the GitHub Actions IAM role"
  value       = aws_iam_role.github_actions_bootstrap.arn
}

output "oidc_provider_arn" {
  description = "ARN of the GitHub OIDC provider"
  value       = aws_iam_openid_connect_provider.github_actions.arn
}

output "terraform_state_bucket" {
  description = "Name of the Terraform state bucket"
  value       = aws_s3_bucket.terraform_state_bootstrap.id
}

output "aws_account_id" {
  description = "AWS Account ID"
  value       = data.aws_caller_identity.current.account_id
}

data "aws_caller_identity" "current" {}
