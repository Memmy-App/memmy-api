import {GiphyFetch} from '@giphy/js-fetch-api';
import Env from '@ioc:Adonis/Core/Env';
import { IGif } from '@giphy/js-types';

export const giphySearch = async (term: string): Promise<string[]> => {
  const gf = new GiphyFetch(Env.get('GIPHY_API_TOKEN'));
  const {data} = await gf.search(term, {limit: 30, sort: 'relevant'});

  return data.map((gif: IGif) => `https://i.giphy.com/${gif.id}`);
};

export const giphyTrending = async (): Promise<string[]> => {
  const gf = new GiphyFetch(Env.get('GIPHY_API_TOKEN'));
  const {data} = await gf.trending({limit: 30});

  return data.map((gif: IGif) => `https://i.giphy.com/${gif.id}.gif`);
};
