import { Injectable } from '@nestjs/common';
import { parse } from 'dotenv';

import * as fs from 'fs';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };
  constructor() {
    const isDevelopementEnv = process.env.NODE_ENV !== 'production';
    if (isDevelopementEnv) {
      const envFilePath = __dirname + '/../../.env';
      const existPath = fs.existsSync(envFilePath);
      if (!existPath) {
        console.log('Archivo .env no existe');
        process.exit(0);
      }

      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
        POSTGRES_PORT_EXTERNAL: process.env.POSTGRES_PORT_EXTERNAL,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        DB_NAME: process.env.DB_NAME,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_SYNC: process.env.DB_SYNC,
      };
    }
  }
  get(key: string): string {
    return this.envConfig[key];
  }
}
