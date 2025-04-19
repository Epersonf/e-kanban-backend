import { Module } from '@nestjs/common';
import { SwimlanesService } from './swimlanes.service';
import { SwimlanesController } from './controllers/swimlanes-user.controller';
import { SwimlanesDao } from './swimlanes.dao';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [SwimlanesController],
  providers: [SwimlanesService, SwimlanesDao],
  exports: [SwimlanesService],
})
export class SwimlanesModule {}
