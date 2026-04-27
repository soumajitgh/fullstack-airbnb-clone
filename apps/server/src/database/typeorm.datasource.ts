import path from 'node:path';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import { createTypeOrmOptions } from './typeorm.config';

const repoRoot = path.resolve(__dirname, '../../../..');
const stage = process.env.STAGE ?? 'dev';

dotenv.config({ path: path.resolve(repoRoot, `.env.stage.${stage}`) });
dotenv.config({ path: path.resolve(repoRoot, '.env') });

const dataSource = new DataSource(
  createTypeOrmOptions({
    DB_HOST: process.env.DB_HOST ?? 'localhost',
    DB_PORT: process.env.DB_PORT ?? 5432,
    DB_USERNAME: process.env.DB_USERNAME ?? 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD ?? 'postgres',
    DB_DATABASE: process.env.DB_DATABASE ?? 'airbnb_clone',
  }),
);

export default dataSource;
