export const oauthEnv = {
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    cleint_secret: process.env.GOOGLE_CLIENT_SECRET,
    code_verifier: process.env.GOOGLE_CODE_VERIFIER,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
  },
};

export const provider = {
  google: 'GOOGLE',
  naver: 'NAVER',
  apple: 'APPLE',
};
