import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig = (configService: ConfigService) => {
  // console.log({
  //   type: 'mssql',
  //   host: configService.get('DB_HOST'),
  //   port: +configService.get<number>('DB_PORT'),
  //   username: configService.get<String>('DB_USERNAME'),
  //   password: configService.get<String>('DB_PASSWORD'),
  //   database: configService.get<String>('DB_NAME')
  // })
  console.log(configService.get<number>('DB_PORT'))
  return {
    type: 'mssql',
    host: configService.get('DB_HOST'),
    port: +configService.get<number>('DB_PORT'),
    username: configService.get<String>('DB_USERNAME'),
    password: configService.get<String>('DB_PASSWORD'),
    database: configService.get<String>('DB_NAME'),
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: false,
    options: { encrypt: false },
  } as TypeOrmModuleOptions;
};
