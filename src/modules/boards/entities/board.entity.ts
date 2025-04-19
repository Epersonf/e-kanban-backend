import { ApiProperty } from "@nestjs/swagger";
import { EntityMutable } from "src/core/common-models/mutable.entity";
import { Swimlane } from "src/modules/swimlanes/entities/swimlane.entity";
import { User } from "src/modules/users/entities/user.entity";
import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class Board extends EntityMutable {
  @JsonProperty()
  @ApiProperty()
  private name: string;

  @JsonProperty()
  @ApiProperty()
  private description?: string;

  @JsonProperty()
  @ApiProperty()
  private memberIds?: string[];

  @ApiProperty({ type: [User] })
  private members?: User[] = undefined;

  @ApiProperty({ type: [Swimlane] })
  private swimlanes?: Swimlane[];

  constructor(params: {
    id?: string;
    name: string;
    description?: string;
    memberIds?: string[];
    members?: User[];
    swimlanes?: Swimlane[];
  }) {
    super(params);
    if (!params) return;
    this.name = params.name;
    this.description = params.description;
    this.memberIds = params.memberIds;
    this.members = params.members;
    this.swimlanes = params.swimlanes;
  }

  public getName(): string { return this.name; }
  public setName(name: string): Board {
    this.name = name;
    return this;
  }
  public getDescription(): string | undefined { return this.description; }
  public setDescription(description: string): Board {
    this.description = description;
    return this;
  }
  public getMemberIds(): string[] | undefined { return this.memberIds; }
  public getMembers(): User[] { return this.members; }

  public getSwimlanes(): Swimlane[] { return this.swimlanes; }
  public setSwimlanes(swimlanes: Swimlane[]) { this.swimlanes = swimlanes; }
  
  public setMembers(members: User[]) { this.members = members; }

  public addToBoard(userId: string) { this.memberIds?.push(userId); }
  public removeFromBoard(userId: string) { this.memberIds?.splice(this.memberIds.indexOf(userId), 1); }
}
