import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { ConnectionOptions } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { Configuration } from '../config/config.keys';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: 'postgres' as const,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
        host: config.get(Configuration.DB_HOST),
        port: parseInt(config.get(Configuration.DB_PORT)),
        username: config.get(Configuration.DB_USER),
        password: config.get(Configuration.DB_PASS),
        database: config.get(Configuration.DB_NAME),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
