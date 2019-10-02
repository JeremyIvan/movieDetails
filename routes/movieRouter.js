const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')

const Movies = require('../models/movieDetails')

const movieRouter = express.Router()

movieRouter.use(bodyParser.json())

movieRouter.route('/movies')
.get((req, res, next) => {
    Movies.find({}).limit(10)
    .then(movies => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        // res.json({title: movies.title, plot: movies.plot})
        res.json(movies)
    }, err => next(err))
    .catch(err => next(err))
})

// Title and Plot
movieRouter.route('/movie/:movieId')
.get((req, res, next) => {
    Movies.findById(req.params.movieId)
    .then(movie => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        // res.json(movie)
        res.json({title: movie.title, plot: movie.plot})
    }, err => next(err))
    .catch(err => next(err))
})

// Countries
movieRouter.route('/movie/:movieId/countries')
.get((req, res, next) => {
    Movies.findById(req.params.movieId)
    .then(movie => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        // res.json(movie)
        res.json({countries: movie.countries})
    }, err => next(err))
    .catch(err => next(err))
})

// Writers
movieRouter.route('/movie/:movieId/writers')
.get((req, res, next) => {
    Movies.findById(req.params.movieId)
    .then(movie => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        // res.json(movie)
        res.json({writers: movie.writers})
    }, err => next(err))
    .catch(err => next(err))
})

// Search for Movies by writer
movieRouter.route('/writers/:movieWriter')
.get((req, res, next) => {
    Movies.aggregate(
        [
            { 
                $match: { "writers": req.params.movieWriter } 
            },
            { 
                $group: { 
                    _id : req.params.movieWriter, 
                    movies: {$push : "$title"}
                } 
            }
        ]
    )
    .then(movies => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({movies: _.head(movies).movies })
    }, err => next(err))
    .catch(err => next(err))
})

// search by title/plot/actor/all
// movieRouter.route('/search/')
// .get((req, res, next) => {
//     Movies.find({})
//     .then(movies => {

//     })
// })

movieRouter.route('/update/:movieId')
.put((req, res, next) => {
    Movies.findByIdAndUpdate(req.params.movieId, {
        $set: req.body
    }, { new: true })
    .then(movie => {
        if(movie !== null && req.body !== null){
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({status: "successful"})
        }
        else if (movie === null && req.body === null){
            res.status = 404
            res.setHeader('Content-Type', 'application/json')
            res.json({status: "unsuccessful"})
        }
        else if(movie.equals(req.body)){
            res.status = 422
            res.setHeader('Content-Type', 'application/json')
            res.json({status: "existing"})
        }
        
    }, err => next(err))
    .catch(err => next(err))
})

movieRouter.route('/delete/:movieId')
.delete((req, res, next) => {
    Movies.findByIdAndRemove(req.params.movieId)
        .then(movie => {
            if ( movie != null) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({status: 'successful'})
            }
            else {
                res.status = 422
                res.setHeader('Content-Type', 'application/json')
                res.json({status: 'unsuccessful'})
            }
        }, err => next(err))
        .catch(err => next(err))
})

module.exports = movieRouter