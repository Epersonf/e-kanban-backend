import { EntityMutable } from "src/core/common-models/mutable.entity";
import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class Task extends EntityMutable {

  @JsonProperty()
  private swimlaneId: string;

  @JsonProperty()
  private name: string;

  @JsonProperty()
  private description: string; // HTML content

  constructor(params: {
    id?: string;
    swimlaneId: string;
    name: string;
    description: string;
    createdAtUtc?: Date;
    updatedAtUtc?: Date;
  }) {
    super(params);
    if (!params) return;
    this.swimlaneId = params.swimlaneId;
    this.name = params.name;
    this.description = params.description;
  }

  public getSwimlaneId(): string {
    return this.swimlaneId;
  }



}