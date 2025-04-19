import { EntityMutable } from "src/core/common-models/mutable.entity";
import { JsonObject, JsonProperty } from "typescript-json-serializer";
import * as bcrypt from 'bcrypt';
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@JsonObject()
export class User extends EntityMutable {

  @JsonProperty()
  @ApiProperty()
  private name: string;
  
  @JsonProperty()
  @ApiProperty()
  private surname: string;
  
  @JsonProperty()
  @Exclude()
  @ApiProperty()
  private password: string;
  
  @JsonProperty()
  @ApiProperty()
  private email: string;

  constructor(params: {
    id?: string;
    createdAtUtc?: Date;
    updatedAtUtc?: Date;
    name: string;
    surname: string;
    password: string;
    email: string;
  }) {
    super(params);
    if (!params) return;
    this.name = params.name;
    this.surname = params.surname;
    this.password = params.password;
    this.email = params.email;
  }
  
  public getEmail() { return this.email; }
  
  public async hashPassword(): Promise<User> {
    this.password = await bcrypt.hash(this.password, 12);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

}
