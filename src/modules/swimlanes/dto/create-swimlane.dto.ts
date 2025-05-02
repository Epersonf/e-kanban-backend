import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";

export class CreateSwimlaneDto {

  @ApiProperty()
  @IsString()
  boardId: string;
  
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  order: number;

}

export class BatchCreateSwimlaneDto {

  @ApiProperty({ type: [CreateSwimlaneDto] })
  @IsArray()
  @ValidateNested({ each: true})
  @Type(() => CreateSwimlaneDto)
  swimlanes: CreateSwimlaneDto[]
}
