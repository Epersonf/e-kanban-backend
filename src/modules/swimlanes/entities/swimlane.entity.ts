import { EntityMutable } from "src/core/common-models/mutable.entity";
import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class Swimlane extends EntityMutable {

  @JsonProperty()
  private boardId: string;

  @JsonProperty()
  private name: string;

  @JsonProperty()
  private order: number;

  constructor(params: {
    id?: string;
    boardId: string;
    name: string;
    order: number;
    createdAtUtc?: Date;
    updatedAtUtc?: Date;
  }) {
    super(params);
    if (!params) return;
    this.boardId = params.boardId;
    this.name = params.name;
    this.order = params.order;
  }

  public getBoardId(): string { return this.boardId; }
  public setBoardId(boardId: string): Swimlane { this.boardId = boardId; return this; }
  public getName(): string { return this.name; }
  public setName(name: string): Swimlane { this.name = name; return this; }
  public getOrder(): number { return this.order; }
  public setOrder(order: number): Swimlane { this.order = order; return this; }

}
