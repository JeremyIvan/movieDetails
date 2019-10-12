const _ = require('lodash');

const Movies = require('../../models/movieModels/movieDetails');

exports.viewMoviesByWriter = (req, res, next) => {
  Movies.find({ writers: req.body.movieWriter })
    .then((movies) => {
      if (movies !== null) {
        Movies.aggregate(
          [
            {
              $match: { writers: new RegExp(req.body.movieWriter) },
            },
            {
              $group: {
                _id: req.body.movieWriter,
                movies: { $push: '$title' },
              },
            },
          ],
        )
          .then((movielist) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ movies: _.head(movielist).movies });
          }, (err) => next(err))
          .catch((err) => next(err));
      } else {
        res.status = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 'writer not found' });
      }
    });
};
