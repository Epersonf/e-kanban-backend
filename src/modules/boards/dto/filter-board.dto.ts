import { ApiProperty } from "@nestjs/swagger";

export class FilterBoardDto {

  @ApiProperty({ required: false })
  ids?: string[];

  @ApiProperty({ required: false })
  memberId?: string;

}