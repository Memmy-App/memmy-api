import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'accounts';

  public async up(): Promise<void> {
    void this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('instance').notNullable().index();
      table.string('username').notNullable().index();
      table.string('auth_token', 510).notNullable().index();
      table.bigint('last_check').defaultTo(0);
      table.bigint('last_notified_id').defaultTo(0);
    });
  }

  public async down(): Promise<void> {
    void this.schema.dropTable(this.tableName);
  }
}
