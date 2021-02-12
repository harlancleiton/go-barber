import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Appointments1613094707699 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'uuid',
            generationStrategy: 'uuid'
          },
          { name: 'provider', type: 'varchar' },
          { name: 'date', type: 'timestamp with time zone' }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
