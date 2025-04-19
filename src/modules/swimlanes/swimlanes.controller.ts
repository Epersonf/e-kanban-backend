import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SwimlanesService } from './swimlanes.service';
import { CreateSwimlaneDto } from './dto/create-swimlane.dto';
import { UpdateSwimlaneDto } from './dto/update-swimlane.dto';

@Controller('swimlanes')
export class SwimlanesController {
  constructor(private readonly swimlanesService: SwimlanesService) {}

  @Post()
  create(@Body() createSwimlaneDto: CreateSwimlaneDto) {
    return this.swimlanesService.create(createSwimlaneDto);
  }

  @Get()
  findAll() {
    return this.swimlanesService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSwimlaneDto: UpdateSwimlaneDto) {
    return this.swimlanesService.update(+id, updateSwimlaneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.swimlanesService.remove(+id);
  }
}
