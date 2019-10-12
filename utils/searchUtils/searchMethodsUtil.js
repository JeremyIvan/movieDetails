const _ = require('lodash');

const searchQuery = require('./searchDatabaseQueries');

const utils = require('../util');

const LIMIT_PER_PAGE = 10;

exports.searchByTitle = (req, res, next, fields) => {
  searchQuery.searchByTitle(req).count()
    .then((totalMoviesFound) => {
      const currentPageMovieCount = totalMoviesFound - ((Number(req.params.page)
        * LIMIT_PER_PAGE) - LIMIT_PER_PAGE);

      searchQuery.searchByTitle(req)
        .skip(((Number(req.params.page) * LIMIT_PER_PAGE) - LIMIT_PER_PAGE))
        .limit(LIMIT_PER_PAGE)
        .then((movies) => {
          let nextPage = true;

          movies.forEach(utils.formatImage);

          if (currentPageMovieCount <= LIMIT_PER_PAGE) {
            nextPage = false;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(
            {
              data: utils.extractFields(movies, fields),
              nextPage,
              totalMoviesFound,
              totalPages: Math.ceil(totalMoviesFound / LIMIT_PER_PAGE),
            },
          );
        }, (err) => next(err))
        .catch((err) => next(err));
    });
};

exports.searchByPlot = (req, res, next, fields) => {
  searchQuery.searchByPlot(req).count()
    .then((totalMoviesFound) => {
      const currentPageMovieCount = totalMoviesFound - ((Number(req.params.page)
        * LIMIT_PER_PAGE) - LIMIT_PER_PAGE);

      searchQuery.searchByPlot(req)
        .skip(((Number(req.params.page) * LIMIT_PER_PAGE) - LIMIT_PER_PAGE))
        .limit(LIMIT_PER_PAGE)
        .then((movies) => {
          let nextPage = true;

          movies.forEach(utils.formatImage);

          if (currentPageMovieCount <= LIMIT_PER_PAGE) {
            nextPage = false;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(
            {
              data: utils.extractFields(movies, fields),
              nextPage,
              totalMoviesFound,
              totalPages: Math.ceil(totalMoviesFound / LIMIT_PER_PAGE),
            },
          );
        }, (err) => next(err))
        .catch((err) => next(err));
    });
};

exports.searchByActor = (req, res, next, fields) => {
  searchQuery.searchByActor(req).count()
    .then((totalMoviesFound) => {
      const currentPageMovieCount = totalMoviesFound - ((Number(req.params.page)
        * LIMIT_PER_PAGE) - LIMIT_PER_PAGE);

      searchQuery.searchByActor(req)
        .skip(((Number(req.params.page) * LIMIT_PER_PAGE) - LIMIT_PER_PAGE))
        .limit(LIMIT_PER_PAGE)
        .then((movies) => {
          let nextPage = true;

          movies.forEach(utils.formatImage);

          if (currentPageMovieCount <= LIMIT_PER_PAGE) {
            nextPage = false;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(
            {
              data: utils.extractFields(movies, fields),
              nextPage,
              totalMoviesFound,
              totalPages: Math.ceil(totalMoviesFound / LIMIT_PER_PAGE),
            },
          );
        }, (err) => next(err))
        .catch((err) => next(err));
    });
};

exports.searchByGenre = (req, res, next, fields) => {
  const genreList = _.head(Object.values(req.body)).split(', ');
  const regexGenreList = [];

  genreList.forEach((genre) => {
    regexGenreList.push(new RegExp(genre, 'ig'));
  });

  searchQuery.searchByGenre(regexGenreList).count()
    .then((totalMoviesFound) => {
      const currentPageMovieCount = totalMoviesFound - ((Number(req.params.page)
        * LIMIT_PER_PAGE) - LIMIT_PER_PAGE);

      searchQuery.searchByGenre(regexGenreList)
        .skip(((Number(req.params.page) * LIMIT_PER_PAGE) - LIMIT_PER_PAGE))
        .limit(LIMIT_PER_PAGE)
        .then((movies) => {
          let nextPage = true;

          movies.forEach(utils.formatImage);

          if (currentPageMovieCount <= LIMIT_PER_PAGE) {
            nextPage = false;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(
            {
              data: utils.extractFields(movies, fields),
              nextPage,
              totalMoviesFound,
              totalPages: Math.ceil(totalMoviesFound / LIMIT_PER_PAGE),
            },
          );
        }, (err) => next(err))
        .catch((err) => next(err));
    });
};

exports.searchByAll = (req, res, next, fields) => {
  searchQuery.searchByMpaaRating(req).count()
    .then((totalMoviesFound) => {
      const currentPageMovieCount = totalMoviesFound - ((Number(req.params.page)
        * LIMIT_PER_PAGE) - LIMIT_PER_PAGE);

      searchQuery.searchByAll(req)
        .skip(((Number(req.params.page) * LIMIT_PER_PAGE) - LIMIT_PER_PAGE))
        .limit(LIMIT_PER_PAGE)
        .then((movies) => {
          let nextPage = true;

          movies.forEach(utils.formatImage);

          if (currentPageMovieCount <= LIMIT_PER_PAGE) {
            nextPage = false;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(
            {
              data: utils.extractFields(movies, fields),
              nextPage,
              totalMoviesFound,
              totalPages: Math.ceil(totalMoviesFound / LIMIT_PER_PAGE),
            },
          );
        }, (err) => next(err))
        .catch((err) => next(err));
    });
};
