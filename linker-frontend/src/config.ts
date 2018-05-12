const portReplacer = (origin, port) =>
  origin.replace(/(((:[\d]*)?$))/, ':' + port);
const PRODUCTION = 'production';

export default {
  API_URL:
    process.env.NODE_ENV === PRODUCTION
      ? portReplacer(window.location.origin, 8080)
      : 'http://localhost:8080'
};
