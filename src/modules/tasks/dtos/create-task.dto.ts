import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsString, Length, ValidateNested } from "class-validator";

export class CreateTaskDto {

  @ApiProperty()
  @IsString()
  swimlaneId: string;

  @ApiProperty()
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(1, 255)
  description?: string;
}

export class BatchCreateTaskDto {
  @ApiProperty({ type: [CreateTaskDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTaskDto)
  tasks: CreateTaskDto[];
}
