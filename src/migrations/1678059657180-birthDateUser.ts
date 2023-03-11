import { MigrationInterface, QueryRunner } from "typeorm";

export class birthDateUser1678059657180 implements MigrationInterface {
  name = "birthDateUser1678059657180";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "birthDate" date`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthDate"`);
  }
}
