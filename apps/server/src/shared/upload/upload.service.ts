import {
  BucketLocationConstraint,
  CreateBucketCommand,
  DeleteObjectCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly bucketName: string;

  private readonly publicBaseUrl: string;

  private readonly region: string;

  private readonly s3Client: S3Client;

  private bucketReady?: Promise<void>;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.getOrThrow<string>('S3_BUCKET');
    this.publicBaseUrl = this.configService
      .getOrThrow<string>('S3_PUBLIC_BASE_URL')
      .replace(/\/+$/, '');
    this.region = this.configService.getOrThrow<string>('S3_REGION');
    this.s3Client = new S3Client({
      region: this.region,
      endpoint: this.configService.getOrThrow<string>('S3_ENDPOINT'),
      forcePathStyle: this.configService.get<boolean>(
        'S3_FORCE_PATH_STYLE',
        true,
      ),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('S3_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>(
          'S3_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  private async ensureBucketExists(): Promise<void> {
    if (!this.bucketReady) {
      this.bucketReady = this.createBucketIfMissing();
    }

    await this.bucketReady;
  }

  private async createBucketIfMissing(): Promise<void> {
    try {
      await this.s3Client.send(
        new HeadBucketCommand({
          Bucket: this.bucketName,
        }),
      );
      return;
    } catch (error) {
      if (!this.isMissingBucketError(error)) {
        throw error;
      }
    }

    try {
      await this.s3Client.send(
        new CreateBucketCommand({
          Bucket: this.bucketName,
          ...(this.region === 'us-east-1'
            ? {}
            : {
                CreateBucketConfiguration: {
                  LocationConstraint: this.region as BucketLocationConstraint,
                },
              }),
        }),
      );
    } catch (error) {
      if (!this.isExistingBucketError(error)) {
        throw error;
      }
    }
  }

  private isMissingBucketError(error: unknown): boolean {
    if (!(error instanceof Error)) {
      return false;
    }

    return (
      error.name === 'NotFound' ||
      error.name === 'NoSuchBucket' ||
      error.name === 'UnknownError'
    );
  }

  private isExistingBucketError(error: unknown): boolean {
    if (!(error instanceof Error)) {
      return false;
    }

    return (
      error.name === 'BucketAlreadyOwnedByYou' ||
      error.name === 'BucketAlreadyExists'
    );
  }

  getPublicUrl(bucketLocation: string): string {
    return `${this.publicBaseUrl}/${this.bucketName}/${bucketLocation}`;
  }

  async uploadBuffer(
    bucketLocation: string,
    body: Buffer,
    contentType?: string,
  ): Promise<{ bucketLocation: string; publicUrl: string }> {
    await this.ensureBucketExists();

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: bucketLocation,
        Body: body,
        ContentType: contentType,
        ACL: 'public-read',
      }),
    );

    return {
      bucketLocation,
      publicUrl: this.getPublicUrl(bucketLocation),
    };
  }

  async deleteObject(bucketLocation: string): Promise<void> {
    await this.ensureBucketExists();

    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: bucketLocation,
      }),
    );
  }
}
