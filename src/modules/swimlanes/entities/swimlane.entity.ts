import { ApiProperty } from "@nestjs/swagger";
import { EntityMutable } from "src/core/common-models/mutable.entity";
import { Task } from "src/modules/tasks/entities/task.entity";
import { JsonObject, JsonProperty } from "typescript-json-serializer";

@JsonObject()
export class Swimlane extends EntityMutable {

  @JsonProperty()
  @ApiProperty()
  private boardId: string;

  @JsonProperty()
  @ApiProperty()
  private name: string;

  @JsonProperty()
  @ApiProperty()
  private order: number;

  @ApiProperty()
  private tasks?: Task[];

  constructor(params: {
    id?: string;
    boardId: string;
    name: string;
    order: number;
    tasks?: Task[];
    createdAtUtc?: Date;
    updatedAtUtc?: Date;
  }) {
    super(params);
    if (!params) return;
    this.boardId = params.boardId;
    this.name = params.name;
    this.order = params.order;
    this.tasks = params.tasks;
  }

  public getBoardId(): string { return this.boardId; }
  public setBoardId(boardId: string): Swimlane { this.boardId = boardId; return this; }
  public getName(): string { return this.name; }
  public setName(name: string): Swimlane { this.name = name; return this; }
  public getOrder(): number { return this.order; }
  public setOrder(order: number): Swimlane { this.order = order; return this; }
  public getTasks(): Task[] { return this.tasks; }
  public setTasks(tasks: Task[]) { this.tasks = tasks; }

}
