module.exports = {
  secret: process.env.SECRET_JWT,
  jwtExpiration: 60,          // 1 minute
  jwtRefreshExpiration: 120,  // 2 minutes
};
