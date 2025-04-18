import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatastoreModule } from './core/utils/datastore.utils';
import { BoardsModule } from './modules/boards/boards.module';

@Module({
  imports: [
    DatastoreModule,
    UsersModule,
    BoardsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
