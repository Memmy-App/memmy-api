import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Account from 'App/Models/Account';
import { PushTokenType } from 'App/Types/PushTokenType';

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public accountId: number;

  @column()
  public type: PushTokenType;

  @column()
  public token: string;

  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>;
}
