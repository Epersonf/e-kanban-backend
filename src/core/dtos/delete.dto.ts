import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class DeleteDto {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}