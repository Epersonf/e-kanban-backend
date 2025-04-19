import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatastoreModule } from './core/utils/datastore.utils';
import { BoardsModule } from './modules/boards/boards.module';
import { SwimlanesModule } from './modules/swimlanes/swimlanes.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    DatastoreModule,
    UsersModule,
    BoardsModule,
    SwimlanesModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
