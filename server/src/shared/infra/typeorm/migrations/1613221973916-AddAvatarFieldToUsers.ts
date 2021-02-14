import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAvatarFieldToUsers1613221973916 implements MigrationInterface {
  name = 'AddAvatarFieldToUsers1613221973916';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "avatar" character varying`
    );

    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_36a3fc9cb216b550beee2dce260" 
      UNIQUE ("avatar")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_36a3fc9cb216b550beee2dce260"`
    );

    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
  }
}
