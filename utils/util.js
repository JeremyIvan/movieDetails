const _ = require('lodash');

exports.extractFields = (data, fields) => {
  const extractFields = (rec) => {
    const res = {};
    fields.forEach((path) => {
      res[path] = _.get(rec, path);
    });
    return res;
  };

  const results = _(data)
    .map(extractFields)
    .value();

  return results;
};

const changeImage = (poster) => {
  const changeString = 'https';
  const regex = /https?/g;

  return poster.replace(regex, changeString);
};

exports.formatImage = (movie) => {
  if (movie.poster != null) {
    // eslint-disable-next-line no-param-reassign
    movie.poster = changeImage(movie.poster);
  }
};
