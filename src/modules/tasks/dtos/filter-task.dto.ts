import { ApiProperty } from "@nestjs/swagger";

export class FilterTaskDto {

  @ApiProperty({ required: false })
  ids?: string[];

  @ApiProperty({ required: false })
  swimlaneIds?: string[];

}