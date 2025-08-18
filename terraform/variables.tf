variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "domain_name" {
  description = "Domain name for the website (e.g., tydanielson.com)"
  type        = string
}

variable "subdomain" {
  description = "Subdomain for the website (leave empty for root domain)"
  type        = string
  default     = ""
}

variable "terraform_state_bucket" {
  description = "Name for the Terraform state bucket"
  type        = string
  default     = "tydanielson-terraform-state"
}

variable "website_bucket_prefix" {
  description = "Prefix for the website bucket name"
  type        = string
  default     = "tydanielson-portfolio"
}

variable "price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100"
  validation {
    condition = contains([
      "PriceClass_All",
      "PriceClass_200",
      "PriceClass_100"
    ], var.price_class)
    error_message = "Price class must be PriceClass_All, PriceClass_200, or PriceClass_100."
  }
}

variable "github_org" {
  description = "GitHub organization or username"
  type        = string
  default     = "tydanielson"
}

variable "github_repo_name" {
  description = "GitHub repository name"
  type        = string
  default     = "tydanielson.github.io"
}
