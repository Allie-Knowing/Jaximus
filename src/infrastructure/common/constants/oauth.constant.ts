export const oauthEnv = {
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    cleint_secret: process.env.GOOGLE_CLIENT_SECRET,
  },
  naver: {
    client_id: process.env.NAVER_CLIENT_ID,
    client_secret: process.env.NAVER_CLIENT_SECRET,
    state: process.env.NAVER_STATE,
  },
};

export const provider = {
  google: 'GOOGLE',
  naver: 'NAVER',
  apple: 'APPLE',
};
