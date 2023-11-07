// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { giphySearch, giphyTrending } from 'App/Giphy/giphySearch';
import * as https from 'https';

export default class GiphyController {
  public async search(ctx: HttpContextContract): Promise<void> {
    const { term } = ctx.request.qs();

    try {
      const res = await giphySearch(term);
      ctx.response.ok(res);
    } catch(e: any) {
      ctx.response.internalServerError();
    }
  }

  public async trending(ctx: HttpContextContract): Promise<void> {
    try {
      const res = await giphyTrending();
      ctx.response.ok(res);
    } catch(e: any) {
      ctx.response.internalServerError();

    }
  }

  public async proxy(ctx: HttpContextContract): Promise<void> {
    const { image } = ctx.request.qs();

    const streamImage = new Promise((resolve, reject) => {
      https.get(`https://i.giphy.com/${image}`, (res) => {
        res.on('data', (chunk) => {
          ctx.response.response.write(chunk);
        });

        res.on('end', () => {
          ctx.response.status(200);
          ctx.response.response.end();
          resolve(true);
        });

        res.on('error', (err) => {
          reject(err);
        });
      });
    });

    try {
      await streamImage;
    } catch(e: any) {
      ctx.response.internalServerError();
    }
  }
}
