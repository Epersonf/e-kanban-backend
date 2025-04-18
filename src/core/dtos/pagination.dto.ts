import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @Transform((params) => Number(params.value))
  @IsNumber()
  @IsOptional()
  @ApiProperty({ default: 1, required: false })
  public page?: number;

  @Transform((params) => Number(params.value))
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ default: 10, required: false })
  public pageSize?: number;

  public getOffset(): number {
    return (this.page - 1) * this.pageSize;
  }

  public getLimit(): number {
    return this.pageSize;
  }
}
