import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersToken1613867128819 implements MigrationInterface {
  name = 'UsersToken1613867128819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "users_token_type_enum" AS ENUM('refresh_token', 'forgot_password')`
    );

    await queryRunner.query(
      `CREATE TABLE "users_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "token" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "type" "users_token_type_enum" NOT NULL, 
      "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
      "user_id" uuid, CONSTRAINT "PK_e03e90fb544adefa10a6c202188" PRIMARY KEY ("id"))`
    );

    await queryRunner.query(
      `ALTER TABLE "users_token" ADD CONSTRAINT "FK_8210de8425b46ee73aab1415570" 
      FOREIGN KEY ("user_id") REFERENCES "users"("id") 
      ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_token" DROP CONSTRAINT "FK_8210de8425b46ee73aab1415570"`
    );

    await queryRunner.query(`DROP TABLE "users_token"`);

    await queryRunner.query(`DROP TYPE "users_token_type_enum"`);
  }
}
