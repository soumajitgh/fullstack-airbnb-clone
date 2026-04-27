import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import path from 'node:path';

import { ListingModule } from './modules/listing/listing.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './shared/upload/upload.module';
import { BookingModule } from './modules/booking/booking.module';
import { createTypeOrmOptions } from './database/typeorm.config';

import { configValidationSchema } from './config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';

const repoRoot = path.resolve(__dirname, '../../..');

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.STAGE === 'prod',
      envFilePath: [
        path.resolve(repoRoot, `.env.stage.${process.env.STAGE}`),
        path.resolve(repoRoot, '.env'),
      ],
      validationSchema: configValidationSchema,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return createTypeOrmOptions({
          DB_HOST: configService.getOrThrow<string>('DB_HOST'),
          DB_PORT: configService.getOrThrow<number>('DB_PORT'),
          DB_USERNAME: configService.getOrThrow<string>('DB_USERNAME'),
          DB_PASSWORD: configService.getOrThrow<string>('DB_PASSWORD'),
          DB_DATABASE: configService.getOrThrow<string>('DB_DATABASE'),
        });
      },
    }),
    ListingModule,
    AuthModule,
    UploadModule,
    BookingModule,
  ],
})
export class AppModule {}
