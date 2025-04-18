import { Datastore } from '@google-cloud/datastore';
import { Global, Module, Provider } from '@nestjs/common';
import { Constants } from '../constants/constants';

class DatastoreUtils {
  private static datastore: Datastore;

  static getInjection(): Provider {
    return {
      provide: Datastore,
      useFactory: async () => {
        return await DatastoreUtils.getInstance();
      }
    };
  }

  static async getInstance(): Promise<Datastore> {
    if (DatastoreUtils.datastore != null) {
      return DatastoreUtils.datastore;
    }

    DatastoreUtils.datastore = new Datastore({
      projectId: Constants.project,
      namespace: Constants.datastoreNamespace,
      databaseId: Constants.datastoreDatabaseId,
    });

    return DatastoreUtils.datastore;
  }
}

const datastoreInjection = DatastoreUtils.getInjection();

@Global()
@Module({
  providers: [
    datastoreInjection
  ],
  exports: [
    datastoreInjection
  ],
})
export class DatastoreModule {}
