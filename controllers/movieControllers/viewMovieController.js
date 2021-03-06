const Movies = require('../../models/movieModels/movieDetails');

const utils = require('../../utils/util');

const LIMIT_PER_PAGE = 10;

exports.viewMovies = (req, res, next) => {
  Movies.find({})
    .limit(LIMIT_PER_PAGE)
    .then((movies) => {
      if (movies !== null) {
        movies.forEach(utils.formatImage);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(movies);
      } else {
        res.status = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 'No movies found' });
      }
    }, (err) => next(err))
    .catch((err) => next(err));
};

exports.viewAllMovies = (req, res, next) => {
  Movies.find({})
    .then((movies) => {
      if (movies !== null) {
        movies.forEach(utils.formatImage);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(movies);
      } else {
        res.status = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 'No movies found' });
      }
    }, (err) => next(err))
    .catch((err) => next(err));
};

exports.viewMoviesWithPages = (req, res, next) => {
  Movies.find({})
    .skip(((Number(req.params.page) * LIMIT_PER_PAGE) - LIMIT_PER_PAGE))
    .limit(LIMIT_PER_PAGE)
    .then((movies) => {
      if (movies !== null) {
        movies.forEach(utils.formatImage);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(movies);
      } else {
        res.status = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 'Movie not found' });
      }
    }, (err) => next(err))
    .catch((err) => next(err));
};

exports.viewMovieTitleAndPlot = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .then((movie) => {
      if (movie !== null) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ title: movie.title, plot: movie.plot });
      } else {
        res.status = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 'Movie not found' });
      }
    }, (err) => next(err))
    .catch((err) => next(err));
};

exports.viewAllMovieData = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .then((movie) => {
      if (movie !== null) {
        utils.formatImage(movie);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(movie);
      } else {
        res.status = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 'Movie not found' });
      }
    }, (err) => next(err))
    .catch((err) => next(err));
};

exports.viewMovieCountries = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .then((movie) => {
      if (movie !== null) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ countries: movie.countries });
      } else {
        res.status = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 'Movie not found' });
      }
    }, (err) => next(err))
    .catch((err) => next(err));
};

exports.viewMovieWriters = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .then((movie) => {
      if (movie !== null) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ writers: movie.writers });
      } else {
        res.status = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 'Movie not found' });
      }
    }, (err) => next(err))
    .catch((err) => next(err));
};

exports.get2016Movies = (req, res, next) => {
  Movies.find({ year: { $gte: 2016 } })
    .then((movies) => {
      if (movies !== null) {
        movies.forEach(utils.formatImage);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(movies);
      } else {
        res.status = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 'Movie not found' });
      }
    }, (err) => next(err))
    .catch((err) => next(err));
};

exports.getTopRated = (req, res, next) => {
  const fields = ['_id', 'title', 'plot', 'actors', 'poster', 'rated', 'genres', 'banner', 'link'];

  Movies.find({}).sort({ metacritic: -1 }).limit(1)
    .then((movie) => {
      if (movie !== null) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          data: utils.extractFields(movie, fields),
          nextPage: false,
          totalMoviesFound: 1,
          totalPages: 1,
        });
      } else {
        res.status = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ status: 'Movie not found' });
      }
    }, (err) => next(err))
    .catch((err) => next(err));
};
