import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Database configuration required by TypeOrm
 */
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.RDS_HOSTNAME || 'localhost',
  port: parseInt(process.env.RDS_PORT, 10) || 6969,
  username: process.env.RDS_USERNAME ||'postgres',
  password: process.env.RDS_PASSWORD || 'qwerty-1234',
  database: process.env.RDS_DB_NAME || 'Hive',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: Boolean(process.env.TYPEORM_SYNC) || false
}