import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 6969,
  username: 'postgres',
  password: 'qwerty-1234',
  database: 'Hive',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true // not recommended to be true in production
}
