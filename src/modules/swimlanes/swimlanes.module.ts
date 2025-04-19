import { Module } from '@nestjs/common';
import { SwimlanesService } from './swimlanes.service';
import { SwimlanesController } from './swimlanes.controller';

@Module({
  controllers: [SwimlanesController],
  providers: [SwimlanesService],
})
export class SwimlanesModule {}
