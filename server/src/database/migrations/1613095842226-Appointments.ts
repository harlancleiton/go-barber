import { MigrationInterface, QueryRunner } from 'typeorm';

export class Appointments1613095842226 implements MigrationInterface {
  name = 'Appointments1613095842226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );

    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    );

    await queryRunner.query(`COMMENT ON COLUMN "appointments"."id" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "appointments"."id" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "updated_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "created_at"`
    );
  }
}
