const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

var upload = multer()

const cors = require('../cors')

const viewMovieController = require('../controllers/viewMovieController')
const viewMoviesByWriterController = require('../controllers/viewMoviesByWriterController')
const updateMovieController = require('../controllers/updateMovieController')
const deleteMovieController = require('../controllers/deleteMovieController')
const searchMoviesController = require('../controllers/searchMoviesController')

const movieRouter = express.Router()

movieRouter.use(bodyParser.json())

movieRouter.route('/movies')
.options(cors.corsWithOptions, cors.sendStatus)
.get(cors.cors, viewMovieController.viewMovies)

movieRouter.route('/movies/:offset')
.options(cors.corsWithOptions, cors.sendStatus)
.get(cors.cors, viewMovieController.viewMoviesWithOffset)

// Title and Plot
movieRouter.route('/movie/:movieId')
.options(cors.corsWithOptions, cors.sendStatus)
.get(cors.cors, viewMovieController.viewMovieTitleAndPlot)

movieRouter.route('/movie/:movieId/all')
.options(cors.corsWithOptions, cors.sendStatus)
.get(cors.cors, viewMovieController.viewAllMovieData)

// Countries
movieRouter.route('/movie/:movieId/countries')
.options(cors.corsWithOptions, cors.sendStatus)
.get(cors.cors, viewMovieController.viewMovieCountries)

// Writers
movieRouter.route('/movie/:movieId/writers')
.options(cors.corsWithOptions, cors.sendStatus)
.get(cors.cors, viewMovieController.viewMovieWriters)

// Search for Movies by writer
movieRouter.route('/writers')
.options(cors.corsWithOptions, cors.sendStatus)
.post(cors.cors, upload.none(), viewMoviesByWriterController.viewMoviesByWriter)

// Update Movies by ID
movieRouter.route('/update/:movieId')
.options(cors.corsWithOptions, cors.sendStatus)
.get(cors.cors, updateMovieController.getMovieToUpdateById)
.post(cors.cors, upload.none(), updateMovieController.updateMovieById)

movieRouter.route('/delete')
.options(cors.corsWithOptions, cors.sendStatus)
.post(cors.corsWithOptions, upload.none(), deleteMovieController.deleteMovieById)

// search by title/plot/actor/all
movieRouter.route('/search')
.options(cors.corsWithOptions, cors.sendStatus)
.post(cors.cors, upload.none(), searchMoviesController.searchMovies)

module.exports = movieRouter