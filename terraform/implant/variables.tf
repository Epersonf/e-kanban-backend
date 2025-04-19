variable "ms_name" {
  description = "(Required) The name of the microservice."
  type        = string
}

variable "stage" {
  description = "(Required) The stage you want to deploy (dev|hml|prod)."
  type        = string

  validation {
    condition     = contains(["dev", "hml", "prod"], var.stage)
    error_message = "The stage must be one of dev, hml or prod."
  }
}

variable "region" {
  description = "(Required) The region you want to deploy."
  type        = string
}