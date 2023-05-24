import { MigrationInterface, QueryRunner } from "typeorm";

export class updateColumnAdmin1678110463329 implements MigrationInterface {
    name = 'updateColumnAdmin1678110463329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" DROP DEFAULT`);
    }

}
