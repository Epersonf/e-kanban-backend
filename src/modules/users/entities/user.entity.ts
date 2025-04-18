import { EntityMutable } from "src/core/common-models/mutable.entity";
import { JsonObject, JsonProperty } from "typescript-json-serializer";
import * as bcrypt from 'bcrypt';
import { Exclude } from "class-transformer";

@JsonObject()
export class User extends EntityMutable {

  @JsonProperty()
  private name: string;

  @JsonProperty()
  private surname: string;

  @JsonProperty()
  @Exclude()
  private password: string;

  @JsonProperty()
  private email: string;
  
  @JsonProperty()
  private boards: string[];

  constructor(params: {
    id?: string;
    createdAtUtc?: Date;
    updatedAtUtc?: Date;
    name: string;
    surname: string;
    password: string;
    email: string;
    boards?: string[];
  }) {
    super(params);
    if (!params) return;
    this.name = params.name;
    this.surname = params.surname;
    this.password = params.password;
    this.email = params.email;
    this.boards = params.boards ?? [];
  }
  
  public getEmail() { return this.email; }
  public getBoards() { return this.boards; }
  
  public async hashPassword(): Promise<User> {
    this.password = await bcrypt.hash(this.password, 12);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

}
