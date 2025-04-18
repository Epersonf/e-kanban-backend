import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBoardDto } from './create-board.dto';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}

export class BatchUpdateBoardDto {
  @ApiProperty({ type: [UpdateBoardDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateBoardDto)
  boards: UpdateBoardDto[];
}