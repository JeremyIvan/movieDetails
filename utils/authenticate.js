const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const config = require('./config')

exports.jwtCheck = jwt({
    secret: jwksRsa.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: config.jwksUri
    }),
    audience: config.clientId,
    issuer: config.issuer,
    algorithms: config.algorithms
})