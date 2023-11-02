import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'tokens';

  public async up(): Promise<void> {
    void this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.integer('account_id').unsigned().references('id').inTable('accounts').onDelete('CASCADE');
      table.string('type').checkIn(['ios', 'android']).notNullable();
      table.string('token').notNullable();

      // We want to keep track of if a token is still in use or not so we can
      // remove them when they no longer work.
      table.bigint('last_used').defaultTo(0);
    });
  }

  public async down(): Promise<void> {
    void this.schema.dropTable(this.tableName);
  }
}
