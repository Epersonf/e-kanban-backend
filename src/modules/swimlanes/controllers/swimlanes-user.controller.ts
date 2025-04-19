import { Controller, Get, Post, Body, Patch, Delete, Query, Req } from '@nestjs/common';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { DeleteDto } from 'src/core/dtos/delete.dto';
import { PaginatedListDto } from 'src/core/dtos/paginated-list.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/core/middlewares/user-validation/user-validation.decorator';
import { FilterSwimlaneDto } from '../dto/filter-swimlane.dto';
import { Swimlane } from '../entities/swimlane.entity';
import { SwimlanesService } from '../swimlanes.service';
import { BatchCreateSwimlaneDto } from '../dto/create-swimlane.dto';
import { BatchUpdateSwimlaneDto } from '../dto/update-swimlane.dto';

@Controller('swimlanes/user')
export class SwimlanesController {
  constructor(private readonly swimlanesService: SwimlanesService) {}

  @Auth()
  @Get()
  findAll(
    @Query() pagination: PaginationDto,
    @Query() filters: FilterSwimlaneDto,
  ): Promise<PaginatedListDto<Swimlane>> {
    return this.swimlanesService.findAll({
      pagination,
      filters,
    });
  }

  @Auth()
  @Post()
  @ApiResponse({ status: 201, type: [Swimlane] })
  create(
    @Body() batchCreateSwimlaneDto: BatchCreateSwimlaneDto,
  ): Promise<Swimlane[]> {
    return this.swimlanesService.create(batchCreateSwimlaneDto);
  }

  @Auth()
  @Patch()
  @ApiResponse({ status: 200, type: [Swimlane] })
  update(@Body() batchUpdateSwimlaneDto: BatchUpdateSwimlaneDto): Promise<Swimlane[]> {
    return this.swimlanesService.update(batchUpdateSwimlaneDto);
  }

  @Auth()
  @Delete()
  remove(@Body() deleteDto: DeleteDto): Promise<string[]> {
    return this.swimlanesService.remove(deleteDto.ids);
  }
}
