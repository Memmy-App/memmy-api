import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Token from 'App/Models/Token';

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public instance: string;

  @column()
  public username: string;

  @column()
  public authToken: string;

  @column()
  public lastCheck: number;

  @hasMany(() => Token)
  public tokens: HasMany<typeof Token>;
}
