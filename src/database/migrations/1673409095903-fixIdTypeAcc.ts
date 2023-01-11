import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixIdTypeAcc1673409095903 implements MigrationInterface {
  name = 'fixIdTypeAcc1673409095903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_db1aae32e73347eeb98318f88fb"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "type_account_id_seq" OWNED BY "type_account"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "type_account" ALTER COLUMN "id" SET DEFAULT nextval('"type_account_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_db1aae32e73347eeb98318f88fb" FOREIGN KEY ("typeAccountId") REFERENCES "type_account"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_db1aae32e73347eeb98318f88fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "type_account" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "type_account_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_db1aae32e73347eeb98318f88fb" FOREIGN KEY ("typeAccountId") REFERENCES "type_account"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
