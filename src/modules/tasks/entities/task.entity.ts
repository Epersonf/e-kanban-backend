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

  @JsonProperty()
  private ownerIds: string[];

  @JsonProperty()
  private creatorId: string;

  constructor(params: {
    id?: string;
    swimlaneId: string;
    name: string;
    description: string;
    ownerIds?: string[];
    creatorId: string;
    createdAtUtc?: Date;
    updatedAtUtc?: Date;
  }) {
    super(params);
    if (!params) return;
    this.swimlaneId = params.swimlaneId;
    this.name = params.name;
    this.description = params.description;
    this.ownerIds = params.ownerIds ?? [];
    this.creatorId = params.creatorId;
  }

  public getSwimlaneId(): string {
    return this.swimlaneId;
  }
  
  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getOwnerIds(): string[] {
    return this.ownerIds;
  }

  public getCreatorId(): string {
    return this.creatorId;
  }

  public setName(name: string): Task {
    this.name = name;
    return this;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public setSwimlaneId(swimlaneId: string): Task {
    this.swimlaneId = swimlaneId;
    return this;
  }

  public setOwnerIds(ownerIds: string[]): Task {
    this.ownerIds = ownerIds;
    return this;
  }

  public setCreatorId(creatorId: string): Task {
    this.creatorId = creatorId;
    return this;
  }

}