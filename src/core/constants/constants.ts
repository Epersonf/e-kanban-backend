export class Constants {

  public static readonly stage = process.env.STAGE ?? 'dev';

  public static readonly project = process.env.PROJECT ?? 'e-kanban-project';

  public static readonly datastoreNamespace = 'core';

  public static readonly datastoreDatabaseId = `${this.stage}-kanban`;

  public static readonly msUrl = process.env.MS_URL ?? 'http://localhost:3000';

  public static readonly jwtSecret = process.env.JWT_SECRET ?? 'myUltraSecret';

}