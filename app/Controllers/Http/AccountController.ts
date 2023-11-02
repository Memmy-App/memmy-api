// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import RequestValidator from 'App/Validators/RequestValidator';
import { getSite } from 'App/Lemmy/getSite';
import Account from 'App/Models/Account';
import { PushTokenType } from 'App/Types/PushTokenType';

export default class AccountController {
  public async pushEnable(ctx: HttpContextContract): Promise<void> {
    const payload = await ctx.request.validate(RequestValidator);

    const user = await getSite(payload.instance, payload.authToken);

    if(user == null) {
      ctx.response.unauthorized();
      return;
    }

    let account = await Account
      .query()
      .where('instance', payload.instance.toLowerCase())
      .andWhere('username', user.local_user_view.person.name)
      .first();

    // Create the account if it doesn't exist yet.
    if(account == null) {
      account = await Account.create({
        instance: payload.instance.toLowerCase(),
        username: user.local_user_view.person.name,
        authToken: payload.authToken,
      });
    }

    // Load tokens for the user
    await account.load('tokens');

    // Do nothing if we already have the token
    if(account.tokens.findIndex((t) => t.token === payload.pushToken) > -1) {
      ctx.response.ok({
        success: true,
      });
      return;
    }

    // Add the push token
    await account.related('tokens').create({
      type: PushTokenType.ios,
      token: payload.pushToken,
    });

    ctx.response.ok({
      success: true,
    });
  };

  public async pushDisable(ctx: HttpContextContract): Promise<void> {
    const payload = await ctx.request.validate(RequestValidator);

    const user = await getSite(payload.instance, payload.authToken);

    if(user == null) {
      ctx.response.unauthorized();
      return;
    }

    const account = await Account
      .query()
      .where('instance', payload.instance.toLowerCase())
      .andWhere('username', user.local_user_view.person.name)
      .first();

    // Create the account if it doesn't exist yet.
    if(account == null) {
      ctx.response.unauthorized();
      return;
    }

    // Load tokens for the user
    await account.load('tokens');

    // Add the push token
    await account.related('tokens')
      .query()
      .where('type', PushTokenType.ios)
      .andWhere('token', payload.pushToken)
      .delete();

    ctx.response.ok({
      success: true,
    });
  };
}
