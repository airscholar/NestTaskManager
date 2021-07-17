import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isNil } from '@nestjsx/util';

export const withCache: TypeOrmModuleOptions = {
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: !isNil(process.env.TYPEORM_LOGGING)
    ? !!parseInt(process.env.TYPEORM_LOGGING, 10)
    : true,
  cache: {
    type: process.env.CACHE_TYPE as any,
    options: {
      host: process.env.CACHE_HOST,
      port: process.env.CACHE_PORT,
    },
  },
  entities: [join(__dirname, './**/*.entity{.ts,.js}')],
};
