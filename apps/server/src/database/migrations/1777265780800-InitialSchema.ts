import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1777265780800 implements MigrationInterface {
  name = 'InitialSchema1777265780800';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.query(
      'CREATE TABLE "listing_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bucketLocation" character varying NOT NULL, "publicUrl" character varying NOT NULL, "label" character varying, "category" character varying NOT NULL, "listingId" uuid, CONSTRAINT "PK_5884ca1c2018515c1d738fd18e7" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "checkInDate" character varying NOT NULL, "checkOutDate" character varying NOT NULL, "totalCharge" integer NOT NULL, "listingId" uuid, "userId" uuid, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "listing_location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lat" numeric NOT NULL, "lng" numeric NOT NULL, CONSTRAINT "PK_e6d1a24eb73b3671a8a868dbedf" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "listing" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "costing" integer NOT NULL, "locationId" uuid, "hostId" uuid, CONSTRAINT "REL_45fa265dcc8a8eea0b059e11d8" UNIQUE ("locationId"), CONSTRAINT "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "listing_image" ADD CONSTRAINT "FK_b0d09774d741ddf347b214b95e0" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "booking" ADD CONSTRAINT "FK_c3df1780eccf7f9db2c7d2000cb" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "listing" ADD CONSTRAINT "FK_45fa265dcc8a8eea0b059e11d89" FOREIGN KEY ("locationId") REFERENCES "listing_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "listing" ADD CONSTRAINT "FK_343e6d73a373a839dd7ab414bf4" FOREIGN KEY ("hostId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "listing" DROP CONSTRAINT "FK_343e6d73a373a839dd7ab414bf4"',
    );
    await queryRunner.query(
      'ALTER TABLE "listing" DROP CONSTRAINT "FK_45fa265dcc8a8eea0b059e11d89"',
    );
    await queryRunner.query(
      'ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"',
    );
    await queryRunner.query(
      'ALTER TABLE "booking" DROP CONSTRAINT "FK_c3df1780eccf7f9db2c7d2000cb"',
    );
    await queryRunner.query(
      'ALTER TABLE "listing_image" DROP CONSTRAINT "FK_b0d09774d741ddf347b214b95e0"',
    );
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('DROP TABLE "listing"');
    await queryRunner.query('DROP TABLE "listing_location"');
    await queryRunner.query('DROP TABLE "booking"');
    await queryRunner.query('DROP TABLE "listing_image"');
  }
}
