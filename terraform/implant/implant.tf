locals {
  repo_owner      = "Epersonf"
  repo_name       = "e-kanban-backend"
  namespace       = "default"

  datastore_database = "${var.stage}-kanban"

  environments = {
    dev = {
      branch             = "development"
      project            = "e-kanban-project"
    }
    prod = {
      branch             = "main"
      project            = "e-kanban-project"
    }
  }

  docker_image = "gcr.io/${local.environments[var.stage].project}/${var.ms_name}"
}

provider "google" {
  project = local.environments[var.stage].project
  region  = var.region
}

data "google_project" "project" {}

data "google_service_account" "cloud_build_acc" {
  account_id = "cloud-build-sa"
  project    = local.environments[var.stage].project
}

resource "google_cloudbuild_trigger" "trigger" {
  name        = "${var.stage}-${var.ms_name}-trigger"
  description = "Trigger para implantação automática da branch ${local.environments[var.stage].branch} para o repositorio ${var.ms_name}"
  location    = "global"
  provider    = google-beta
  project     = local.environments[var.stage].project
  service_account = data.google_service_account.cloud_build_acc.id

  github {
    owner = local.repo_owner
    name  = local.repo_name
    push {
      branch = "^${local.environments[var.stage].branch}$"
    }
  }

  build {

    # Build the docker image
    step {
      id = "Build docker image"
      name = "gcr.io/cloud-builders/docker"
      entrypoint = "bash"
      args = ["-c", "docker build --build-arg=\"stage=${var.stage}\" --build-arg=\"project=${local.environments[var.stage].project}\" -t ${local.docker_image}:$SHORT_SHA ."]
    }

    # Push the docker image
    step {
      id = "Push docker image"
      name = "gcr.io/cloud-builders/docker"
      args = ["push", "${local.docker_image}:$SHORT_SHA"]
    }

    # Init terraform
    step {
      id = "Init terraform"
      name = "hashicorp/terraform:latest"
      dir = "terraform/deploy"
      args = [
        "init", "-upgrade"
      ]
    }

    # Update terraform
    step {
      id = "Update terraform"
      name = "hashicorp/terraform:latest"
      dir = "terraform/deploy"
      args = [
        "get", "-update"
      ]
    }

    # Create/select terraform workspace
    step {
      id = "Create/select terraform workspace"
      name = "hashicorp/terraform:latest"
      entrypoint = "sh"
      dir = "terraform/deploy"
      args = [
        "-c",
        "(terraform workspace select ${var.stage} || terraform workspace new ${var.stage})"
      ]
    }

    # Apply terraform
    step {
      id = "Apply terraform"
      name = "hashicorp/terraform:latest"
      dir = "terraform/deploy"
      args = [
        "apply",
        "-var=stage=${var.stage}",
        "-var=ms_name=${var.ms_name}",
        "-var=region=${var.region}",
        "-var=image=${local.docker_image}:$SHORT_SHA",
        "-var=project=${local.environments[var.stage].project}",
        "-lock=false",
        "-input=false",
        "-auto-approve",
      ]
    }

    # Apply Datastore indexes
    step {
      id         = "Apply Datastore indexes"
      name       = "gcr.io/google.com/cloudsdktool/cloud-sdk"
      entrypoint = "sh"
      args = [
        "-c",
        "echo \"Y\" | gcloud datastore indexes create ./datastore/index.yaml --project=${local.environments[var.stage].project} ${local.datastore_database == "(default)" ? "" : "--database=${local.datastore_database}"}"
      ]
    }

    options {
      logging = "CLOUD_LOGGING_ONLY"
    }
  }

}