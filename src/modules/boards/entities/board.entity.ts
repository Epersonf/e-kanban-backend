import { EntityMutable } from "src/core/common-models/mutable.entity";
import { User } from "src/modules/users/entities/user.entity";
import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class Board extends EntityMutable {
  @JsonProperty()
  private name: string;

  @JsonProperty()
  private description?: string;

  @JsonProperty()
  private members?: User[] = undefined;

  constructor(params: {
    id?: string;
    name: string;
    description?: string;
    members?: User[];
  }) {
    super(params);
    if (!params) return;
    this.name = params.name;
    this.description = params.description;
    this.members = params.members;
  }

  public getName(): string { return this.name; }
  public getDescription(): string | undefined { return this.description; }
  public getMembers(): User[] { return this.members; }
  
  public setMembers(members: User[]) { this.members = members; }
}
