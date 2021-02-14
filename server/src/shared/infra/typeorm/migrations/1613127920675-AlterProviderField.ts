import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterProviderField1613127920675 implements MigrationInterface {
  name = 'AlterProviderField1613127920675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" RENAME COLUMN "provider" TO "provider_id"`
    );

    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "provider_id"`
    );

    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "provider_id" uuid NOT NULL`
    );

    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_e3e268ed1125872144e68b9a41c" 
      FOREIGN KEY ("provider_id") REFERENCES "users"("id") 
      ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_e3e268ed1125872144e68b9a41c"`
    );

    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "provider_id"`
    );

    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "provider_id" character varying NOT NULL`
    );

    await queryRunner.query(
      `ALTER TABLE "appointments" RENAME COLUMN "provider_id" TO "provider"`
    );
  }
}
