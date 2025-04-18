import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class UserTokenModel {
  @JsonProperty()
  id: string;

  @JsonProperty()
  expiresAt: number;

  constructor(params: {
    id: string;
    expiresAt: number,
  }) {
    if (!params) return;
    this.id = params.id;
    this.expiresAt = params.expiresAt;
  }

}