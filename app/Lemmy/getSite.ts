import { LemmyHttp, MyUserInfo } from 'lemmy-js-client';

export const getSite = async (instance: string, authToken: string): Promise<MyUserInfo | null> => {
  const lemmy = new LemmyHttp(`https://${instance}`, {
    headers: {
      'User-Agent': 'Memmy API - 1.0.0',
      Authorization: `Bearer ${authToken}`,
    },
  });

  const res = await lemmy.getSite({
    auth: authToken,
  });

  return res.my_user ?? null;
};
