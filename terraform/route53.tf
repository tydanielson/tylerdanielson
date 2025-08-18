# Route53 Records
resource "aws_route53_record" "website" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = local.full_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

# WWW redirect (if using root domain) or root redirect (if using subdomain)
resource "aws_route53_record" "website_redirect" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.subdomain == "" ? "www.${var.domain_name}" : var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}
