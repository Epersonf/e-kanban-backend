import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean } from "class-validator";

export class PopulateBoardDto {

  @ApiProperty({ required: false })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  populateWithSwimlanes?: boolean;
  
  @ApiProperty({ required: false })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  populateWithMembers?: boolean;

}