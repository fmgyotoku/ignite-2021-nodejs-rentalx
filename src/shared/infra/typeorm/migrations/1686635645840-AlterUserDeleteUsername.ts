import { MigrationInterface, QueryRunner, TableColumn, TableIndex, TableUnique, TableUniqueOptions } from "typeorm"

export class AlterUserDeleteUsername1686635645840 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "username")
    await queryRunner.createIndex("users", new TableIndex({
      name: "rentx_users_email", 
      columnNames: ["email"], 
      isUnique: true
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("users", new TableColumn({
      name: "username",
      type: "varchar"
    }))

    await queryRunner.dropIndex("users", "rentx_users_email")
  }
}
