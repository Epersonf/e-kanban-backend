ms_name="e-kanban"
region="us-east1"

implant-prepare:
	cd terraform/implant && \
	terraform init -upgrade && \
	terraform get -update && \
	(terraform workspace select $(stage) || terraform workspace new $(stage)) && \
	terraform apply -var=stage=$(stage) -var=ms_name=$(ms_name) -var=region=$(region)

implant-dev:
	make implant-prepare stage=dev

implant-prod:
	make implant-prepare stage=prod