import { Module } from '@nestjs/common';
import { SwimlanesService } from './swimlanes.service';
import { SwimlanesController } from './controllers/swimlanes-user.controller';
import { SwimlanesDao } from './swimlanes.dao';
import { DatastoreModule } from 'src/core/utils/datastore.utils'; // Import DatastoreModule

@Module({
  imports: [DatastoreModule], // Import DatastoreModule
  controllers: [SwimlanesController],
  providers: [SwimlanesService, SwimlanesDao], // Provide SwimlanesDao
})
export class SwimlanesModule {}
