import { ApiProperty } from "@nestjs/swagger";

export class FilterBoardDto {

  @ApiProperty()
  ids?: string[];

}