import { ApiProperty } from "@nestjs/swagger";
import { EntityMutable } from "src/core/common-models/mutable.entity";
import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class Task extends EntityMutable {

  @JsonProperty()
  @ApiProperty()
  private swimlaneId: string;

  @JsonProperty()
  @ApiProperty()
  private name: string;

  @JsonProperty()
  @ApiProperty()
  private description: string; // HTML content

  @JsonProperty()
  @ApiProperty()
  private ownerIds: string[];

  @JsonProperty()
  @ApiProperty()
  private creatorId: string;

  @JsonProperty()
  @ApiProperty()
  private order: number;

  constructor(params: {
    id?: string;
    swimlaneId: string;
    name: string;
    description: string;
    ownerIds?: string[];
    creatorId: string;
    order: number;
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
    this.order = params.order;
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

  public getOrder(): number {
    return this.order;
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

  public setOrder(order: number): Task {
    this.order = order;
    return this;
  }

}