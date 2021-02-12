import { MigrationInterface, QueryRunner } from 'typeorm';

export class Appointments1613095983507 implements MigrationInterface {
  name = 'Appointments1613095983507';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "provider" character varying NOT NULL, 
      "date" TIMESTAMP WITH TIME ZONE NOT NULL, 
      "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
      CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "appointments"`);
  }
}
