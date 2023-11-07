// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { giphySearch, giphyTrending } from 'App/Giphy/giphySearch';

export default class GiphyController {
  public async search(ctx: HttpContextContract): Promise<void> {
    const { term } = ctx.request.qs();

    try {
      const res = await giphySearch(term);
      ctx.response.ok(res);
    } catch(e: any) {
      ctx.response.internalServerError({
        success: false,
        error: e.message,
      });
    }
  }

  public async trending(ctx: HttpContextContract): Promise<void> {
    try {
      const res = await giphyTrending();
      ctx.response.ok(res);
    } catch(e: any) {
      ctx.response.internalServerError({
        success: false,
        error: e.message,
      });
    }
  }
}