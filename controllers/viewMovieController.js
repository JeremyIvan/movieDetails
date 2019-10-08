const Movies = require('../models/movieDetails')

const utils = require('../utils/util')

exports.viewMovies = (req, res, next) => {
    Movies.find({}).limit(10)
    .then(movies => {
        if (movies !== null) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
    
            movies.forEach(movie => {
                if(movie.poster != null){
                    let newPosterLink = utils.changeImage(movie.poster)
                    movie.poster = newPosterLink
                }
            })
    
            res.json(movies)
        }
        else {
            res.status = 404
            res.setHeader('Content-Type', 'application/json')
            res.json({status: 'No movies found'})
        }
    }, err => next(err))
    .catch(err => next(err))
}

exports.viewMoviesWithPages = (req, res, next) => {
    Movies.find({}).skip(((Number(req.params.page)*10)-10)).limit(10)
    .then(movies => {
        if (movies !== null) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
    
            movies.forEach(movie => {
                if(movie.poster != null){
                    let newPosterLink = utils.changeImage(movie.poster)
                    movie.poster = newPosterLink
                }
            })
    
            res.json(movies)
        }
        else {
            res.status = 404
            res.setHeader('Content-Type', 'application/json')
            res.json({status: 'Movie not found'})
        }
    }, err => next(err))
    .catch(err => next(err))
}

exports.viewMovieTitleAndPlot = (req, res, next) => {
    Movies.findById(req.params.movieId)
    .then(movie => {
        if (movie !== null) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({title: movie.title, plot: movie.plot})
        }
        else {
            res.status = 404
            res.setHeader('Content-Type', 'application/json')
            res.json({status: 'Movie not found'})
        }
    }, err => next(err))
    .catch(err => next(err))
}

exports.viewAllMovieData = (req, res, next) => {
    Movies.findById(req.params.movieId)
    .then(movie => {
        if (movie !== null) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
    
            if(movie.poster != null){
                let newPosterLink = utils.changeImage(movie.poster)
                movie.poster = newPosterLink
            }
    
            res.json(movie)
        }
        else {
            res.status = 404
            res.setHeader('Content-Type', 'application/json')
            res.json({status: 'Movie not found'})
        }
    }, err => next(err))
    .catch(err => next(err))
}

exports.viewMovieCountries = (req, res, next) => {
    Movies.findById(req.params.movieId)
    .then(movie => {
        if (movie !== null) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({countries: movie.countries})
        }
        else {
            res.status = 404
            res.setHeader('Content-Type', 'application/json')
            res.json({status: 'Movie not found'})
        }
    }, err => next(err))
    .catch(err => next(err))
}

exports.viewMovieWriters = (req, res, next) => {
    Movies.findById(req.params.movieId)
    .then(movie => {
        if(movie !== null) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({writers: movie.writers})
        }
        else {
            res.status = 404
            res.setHeader('Content-Type', 'application/json')
            res.json({status: 'Movie not found'})
        }
    }, err => next(err))
    .catch(err => next(err))
}