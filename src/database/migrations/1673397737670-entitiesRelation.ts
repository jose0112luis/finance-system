import { MigrationInterface, QueryRunner } from 'typeorm';

export class entitiesRelation1673397737670 implements MigrationInterface {
  name = 'entitiesRelation1673397737670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_role" ADD "roleId" integer`);
    await queryRunner.query(`ALTER TABLE "user_role" ADD "userId" integer`);
    await queryRunner.query(`ALTER TABLE "movement" ADD "accountId" integer`);
    await queryRunner.query(
      `ALTER TABLE "movement" ADD "typeMovementId" integer`,
    );
    await queryRunner.query(`ALTER TABLE "account" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "account" ADD "typeAccountId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movement" ADD CONSTRAINT "FK_8d304e97918893e003a77d39f3f" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movement" ADD CONSTRAINT "FK_27f62f86343696ba52230e45618" FOREIGN KEY ("typeMovementId") REFERENCES "type_movement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
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
      `ALTER TABLE "account" DROP CONSTRAINT "FK_60328bf27019ff5498c4b977421"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movement" DROP CONSTRAINT "FK_27f62f86343696ba52230e45618"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movement" DROP CONSTRAINT "FK_8d304e97918893e003a77d39f3f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP COLUMN "typeAccountId"`,
    );
    await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "movement" DROP COLUMN "typeMovementId"`,
    );
    await queryRunner.query(`ALTER TABLE "movement" DROP COLUMN "accountId"`);
    await queryRunner.query(`ALTER TABLE "user_role" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "user_role" DROP COLUMN "roleId"`);
  }
}
