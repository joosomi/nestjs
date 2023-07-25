import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1613122798443 implements MigrationInterface {
  name = 'SeedDb1613122798443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'),('coffee'),('nestjs')`,
    );

    await queryRunner.query(
      //password is 123
      `INSERT INTO users (username, email, password) VALUES ('somi', 'foo@gmail.com', ' $2b$10$fAjh0vMJ1V788n8dAqU6lOFD5PS5BTi4.nbJpJU8rUbA3mvWg2g')`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES 
      ('first-article', 'First article', 'First article description', 'First article body',
      'coffee,dragons', 1), ('second-article', 'Second article', 'Second article description', 'Second article body','coffee,dragons', 1)`,
    );
  }

  public async down(): Promise<void> {}
}

//default seed data
