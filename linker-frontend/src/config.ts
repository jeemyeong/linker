const portReplacer = (origin, port) =>
  origin.replace(/(((:[\d]*)?$))/, ':' + port);
const PRODUCTION = 'production';
export const __PRODUCTION__ = process.env.NODE_ENV === PRODUCTION;

export default {
  API_URL:
    __PRODUCTION__
      ? portReplacer(window.location.origin, 8080)
      : 'http://localhost:8080',
  GOOGLE_CLIENT_ID: "178132627968-qii6o29lgn7l5gatelcq4iqs3ag6vqa0.apps.googleusercontent.com"
};
