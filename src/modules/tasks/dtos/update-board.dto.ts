import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}

export class BatchUpdateTaskDto {
  @ApiProperty({ type: [UpdateTaskDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateTaskDto)
  Tasks: UpdateTaskDto[];
}