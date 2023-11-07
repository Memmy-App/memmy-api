import {GiphyFetch} from '@giphy/js-fetch-api';
import Env from '@ioc:Adonis/Core/Env';
import { IGif } from '@giphy/js-types';

interface IResult {
  proxyUrl: string;
  url: string;
}

export const giphySearch = async (term: string, offset = 0): Promise<IResult[]> => {
  const gf = new GiphyFetch(Env.get('GIPHY_API_TOKEN'));
  const {data} = await gf.search(term, {limit: 20, sort: 'relevant', offset});

  return data.map((gif: IGif) => ({
    proxyUrl: `${Env.get('BASE_URL')}/giphy/image/?image=${gif.id}.gif`,
    url: 'https://i.giphy.com/media/' + gif.id + '.gif',
  }));
};

export const giphyTrending = async (offset = 0): Promise<IResult[]> => {
  const gf = new GiphyFetch(Env.get('GIPHY_API_TOKEN'));
  const {data} = await gf.trending({limit: 20, offset});

  return data.map((gif: IGif) => ({
    proxyUrl: `${Env.get('BASE_URL')}/giphy/image/?image=${gif.id}.gif`,
    url: 'https://i.giphy.com/media/' + gif.id + '.gif',
  }));};
