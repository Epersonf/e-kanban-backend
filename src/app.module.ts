import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DatastoreModule } from './core/utils/datastore.utils';

@Module({
  imports: [
    DatastoreModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
