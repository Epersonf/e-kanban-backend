provider "google" {
  project = var.project
  region  = var.region
}

data "google_project" "project" {
  project_id = var.project
}

data "google_secret_manager_secret_version" "gke_workloads_sa_cred" {
  provider = google-beta
  secret   = "gke-workloads-sa-cred"
  version  = "latest"
  project  = var.project
}

data "google_secret_manager_secret_version" "jwt_secret" {
  provider = google-beta
  secret   = "jwt-secret"
  version  = "latest"
  project  = var.project
}

data "google_secret_manager_secret_version" "api_key" {
  provider = google-beta
  secret   = "intra-secret-api-key"
  version  = "latest"
  project  = var.project
}

resource "google_cloud_run_v2_service" "my_service" {
  name     = "${var.stage}-${var.ms_name}"
  location = var.region
  project  = data.google_project.project.project_id

  ingress = "INGRESS_TRAFFIC_ALL"

  deletion_protection = false

  template {
    scaling {
      min_instance_count = 0
      max_instance_count = 100
    }
    containers {
      image = var.image

      env {
        name = "STAGE"
        value = var.stage
      }

      env {
        name = "MS_URL"
        value = "https://${var.stage}-${var.ms_name}-${data.google_project.project.number}.${var.region}.run.app/"
      }
      env {
        name  = "gke-workloads-sa-cred"
        value = data.google_secret_manager_secret_version.gke_workloads_sa_cred.secret_data
      }
      env {
        name  = "jwt-secret"
        value = data.google_secret_manager_secret_version.jwt_secret.secret_data
      }
      env {
        name  = "intra-secret-api-key"
        value = data.google_secret_manager_secret_version.api_key.secret_data
      }
    }
  }
}

data "google_iam_policy" "iam_policy" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "iam_policy" {
  project  = data.google_project.project.project_id
  location = var.region
  service  = google_cloud_run_v2_service.my_service.name
  policy_data = data.google_iam_policy.iam_policy.policy_data
}

# Service Account
data "google_service_account" "service_account" {
  account_id = "cloud-build-sa"
  project    = var.project
}