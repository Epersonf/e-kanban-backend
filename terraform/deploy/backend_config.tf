terraform {
  required_version = ">= 1.6.3"
  backend "gcs" {
    bucket = "tf-e-kanban-states"
    prefix = "/cloudrun/e-kanban"
  }
}