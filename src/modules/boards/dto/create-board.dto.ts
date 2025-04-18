import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsString, Length, ValidateNested } from "class-validator";

export class CreateBoardDto {
  @ApiProperty()
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(1, 255)
  description?: string;
}

export class BatchCreateBoardDto {
  @ApiProperty({ type: [CreateBoardDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBoardDto)
  boards: CreateBoardDto[];
}
