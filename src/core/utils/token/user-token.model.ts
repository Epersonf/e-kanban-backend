import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class UserTokenModel {
  @JsonProperty()
  id: string;

  @JsonProperty()
  boards: string[];

  @JsonProperty()
  expiresAt: number;

  constructor(params: {
    id: string;
    boards: string[];
    expiresAt: number,
  }) {
    this.id = params.id;
    this.boards = params.boards;
    this.expiresAt = params.expiresAt;
  }

}