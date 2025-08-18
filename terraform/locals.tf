# Additional provider for ACM certificate (must be in us-east-1)
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
  
  default_tags {
    tags = {
      Project     = "Portfolio Website"
      Environment = var.environment
      ManagedBy   = "Terraform"
      Owner       = "Tyler Danielson"
    }
  }
}

# Local values
locals {
  full_domain = var.subdomain == "" ? var.domain_name : "${var.subdomain}.${var.domain_name}"
}
