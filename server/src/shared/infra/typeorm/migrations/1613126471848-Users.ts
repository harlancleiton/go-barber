import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1613126471848 implements MigrationInterface {
  name = 'Users1613126471848';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "firstname" character varying NOT NULL, 
      "lastname" character varying NOT NULL, 
      "email" character varying(70) NOT NULL, 
      "password" character varying(254) NOT NULL, 
      "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
      CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), 
      CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9" UNIQUE ("password"), 
      CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
