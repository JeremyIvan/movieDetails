const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

let upload = multer()

const cors = require('../../utils/cors')
const authenticate = require('../../utils/authenticate')

const viewMovieController = require('../../controllers/movieControllers/viewMovieController')
const viewMoviesByWriterController = require('../../controllers/movieControllers/viewMoviesByWriterController')
const updateMovieController = require('../../controllers/movieControllers/updateMovieController')
const deleteMovieController = require('../../controllers/movieControllers/deleteMovieController')
const searchMoviesController = require('../../controllers/movieControllers/searchMoviesController')

const movieRouter = express.Router()

movieRouter.use(bodyParser.json())

movieRouter.route('/movies')
.options(cors.corsWithOptions, cors.sendStatus)
.get(cors.cors, authenticate.jwtCheck, viewMovieController.viewMovies)

movieRouter.route('/movies/:offset')
.options(cors.corsWithOptions, cors.sendStatus)
.get(cors.cors, viewMovieController.viewMoviesWithOffset)

// Title and Plot
movieRouter.route('/movie/:movieId')
.options(cors.corsWithOptions, cors.sendStatus)
.get(cors.cors, viewMovieController.viewMovieTitleAndPlot)

// Show all data
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

movieRouter.route('/movie/getRandomMovie')
.options(cors.corsWithOptions, cors.sendStatus)
.get(cors.cors, viewMovieController.viewOneRandomMovie)

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
.options(cors.cors, cors.sendStatus)
.post(cors.corsWithOptions, upload.none(), deleteMovieController.deleteMovieById)

// search by title/plot/actor/all
movieRouter.route('/search')
.options(cors.cors, cors.sendStatus)
.post(cors.cors, upload.none(), searchMoviesController.searchMovies)

module.exports = movieRouter