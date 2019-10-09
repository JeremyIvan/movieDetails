const _ = require('lodash')

const Movies = require('../../models/movie/movieDetails')

exports.getMovieToUpdateById = (req, res, next) => {
    Movies.findById(req.params.movieId)
    .then(movie => {
        if(movie !== null) {
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

exports.updateMovieById = (req, res, next) => {
    Movies.findById(req.params.movieId)
    .then(movie => {
        if(movie !== null){
            if(!(Object.keys(req.body).length === 0) && movie[_.head(Object.keys(req.body))] != _.head(Object.values(req.body)) ) {
                Movies.findByIdAndUpdate(req.params.movieId, 
                    { $set: req.body },
                    { new: true })
                .then(movie => {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.json({status: "successful"})
                }, err => next(err))
                .catch(err => next(err))
            }
            else {
                res.status = 422
                res.setHeader('Content-Type', 'application/json')
                res.json({status: "existing"})        
            }
        }
        else {
            res.status = 404
            res.setHeader('Content-Type', 'application/json')
            res.json({status: "unsuccessful"})
            
        }
            
    }, err => next(err))
    .catch(err => next(err))
}