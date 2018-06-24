const portReplacer = (origin, port) =>
  origin.replace(/(((:[\d]*)?$))/, ':' + port);
const PRODUCTION = 'production';
export const __PRODUCTION__ = process.env.NODE_ENV === PRODUCTION;

export default {
  API_URL:
    __PRODUCTION__
      ? portReplacer(window.location.origin, 8080)
      : 'http://localhost:8080'
};
