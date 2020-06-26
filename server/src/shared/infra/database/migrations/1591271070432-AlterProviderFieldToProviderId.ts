import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1591271070432
  implements MigrationInterface {
  tableName = 'appointments';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, 'provider');

    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: 'AppointmentProviderFK',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'set null',
        onUpdate: 'cascade',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.tableName, 'AppointmentProviderFK');

    await queryRunner.dropColumn(this.tableName, 'provider_id');

    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
