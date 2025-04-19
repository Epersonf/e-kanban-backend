import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean } from "class-validator";

export class PopulateSwimlaneDto {
  @ApiProperty({ required: false })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  populateWithTasks?: boolean;
}