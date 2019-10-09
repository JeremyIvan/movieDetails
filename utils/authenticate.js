var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

const config = require('./config')

exports.jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: config.jwksUri
    }),
    audience: config.audience,
    issuer: config.issuer,
    algorithms: config.algorithms
});