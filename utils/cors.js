const cors = require('cors');

const whitelist = ['http://localhost:3000', '192.168.100.124:3000', '192.168.100.150:3000', '192.168.100.204:3000'];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;

  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }

  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);

exports.sendStatus = (req, res) => {
  res.sendStatus(200);
};
