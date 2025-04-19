import { ApiProperty } from "@nestjs/swagger";

export class PopulateSwimlaneDto {
  @ApiProperty()
  populateWithTasks: boolean;
}