const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const upload = multer();

const cors = require('../../utils/cors');

const authenticate = require('../../utils/authenticate');

const viewMovieController = require('../../controllers/movieControllers/viewMovieController');
const viewMoviesByWriterController = require('../../controllers/movieControllers/viewMoviesByWriterController');
const updateMovieController = require('../../controllers/movieControllers/updateMovieController');
const deleteMovieController = require('../../controllers/movieControllers/deleteMovieController');
const searchMoviesController = require('../../controllers/movieControllers/searchMoviesController');

const movieRouter = express.Router();

movieRouter.use(bodyParser.json());

movieRouter.route('/movies')
  .options(cors.corsWithOptions, cors.sendStatus)
  .get(cors.cors, viewMovieController.viewMovies);

movieRouter.route('/movies/all')
  .options(cors.corsWithOptions, cors.sendStatus)
  .get(cors.cors, viewMovieController.viewAllMovies);

movieRouter.route('/movies/:page')
  .options(cors.corsWithOptions, cors.sendStatus)
  .get(cors.cors, viewMovieController.viewMoviesWithPages);

movieRouter.route('/movie/:movieId')
  .options(cors.corsWithOptions, cors.sendStatus)
  .get(cors.cors, viewMovieController.viewMovieTitleAndPlot);

movieRouter.route('/movie/:movieId/all')
  .options(cors.corsWithOptions, cors.sendStatus)
  .get(cors.cors, viewMovieController.viewAllMovieData);

movieRouter.route('/movie/:movieId/countries')
  .options(cors.corsWithOptions, cors.sendStatus)
  .get(cors.cors, viewMovieController.viewMovieCountries);

movieRouter.route('/movie/:movieId/writers')
  .options(cors.corsWithOptions, cors.sendStatus)
  .get(cors.cors, viewMovieController.viewMovieWriters);

movieRouter.route('/writers')
  .options(cors.corsWithOptions, cors.sendStatus)
  .post(cors.cors, upload.none(), viewMoviesByWriterController.viewMoviesByWriter);

movieRouter.route('/update/:movieId')
  .options(cors.corsWithOptions, cors.sendStatus)
  .post(cors.cors, upload.none(), authenticate.jwtCheck, updateMovieController.updateMovieById);

movieRouter.route('/delete')
  .options(cors.corsWithOptions, cors.sendStatus)
  .post(cors.cors, upload.none(), authenticate.jwtCheck, deleteMovieController.deleteMovieById);

movieRouter.route('/search/:page')
  .options(cors.corsWithOptions, cors.sendStatus)
  .post(cors.cors, upload.none(), searchMoviesController.searchMovies);

movieRouter.route('/2016Movies')
  .options(cors.cors, cors.sendStatus)
  .get(cors.cors, viewMovieController.get2016Movies);

module.exports = movieRouter;
