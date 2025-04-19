import { ApiProperty } from "@nestjs/swagger";

export class FilterSwimlaneDto {
  @ApiProperty({ required: false })
  ids?: string[];

  @ApiProperty({ required: false })
  boardId?: string;
}
