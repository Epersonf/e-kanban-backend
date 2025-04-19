import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class PopulateBoardDto {

  @ApiProperty()
  @IsBoolean()
  populateWithSwimlanes: boolean;

  @ApiProperty()
  @IsBoolean()
  populateWithMembers: boolean;

}