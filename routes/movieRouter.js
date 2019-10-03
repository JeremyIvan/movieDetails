const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')
const multer = require('multer')

var upload = multer()

const Movies = require('../models/movieDetails')

const movieRouter = express.Router()

movieRouter.use(bodyParser.json())

movieRouter.route('/movies')
.get((req, res, next) => {
    Movies.find({}).limit(10)
    .then(movies => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
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
        res.json({writers: movie.writers})
    }, err => next(err))
    .catch(err => next(err))
})

// Search for Movies by writer
movieRouter.route('/writers')
.get(upload.none(), (req, res, next) => {
    Movies.aggregate(
        [
            {  
                $match: { "writers": req.body.movieWriter } 
            },
            {
                $group: { 
                    _id : req.body.movieWriter,
                    movies: {$push : "$title"}
                } 
            }
        ]
    )
    .then(movies => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({ movies: _.head(movies).movies })
    }, err => next(err))
    .catch(err => next(err))
})

// Refactor to show correct status
// does not show existing status instead shows successful
movieRouter.route('/update/:movieId')
.post(upload.none(), (req, res, next) => {
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
        // else if(movie.equals(req.body)){
        //     res.status = 422
        //     res.setHeader('Content-Type', 'application/json')
        //     res.json({status: "existing"})
        // }
        
    }, err => next(err))
    .catch(err => next(err))
})

movieRouter.route('/delete')
.get(upload.none(), (req, res, next) => {
    Movies.findByIdAndRemove(req.body.movieId)
        .then(movie => {
            if ( movie != null) {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json({status: 'successful'})
            }
            else {
                res.status = 422
                res.setHeader('Content-Type', 'application/json')
                res.json({status: 'movie does not exists'})
            }
        }, err => next(err))
        .catch(err => next(err))
})

// search by title/plot/actor/all
movieRouter.route('/search')
.get(upload.none(), (req, res, next) => {
    if(Object.keys(req.body).length === 1){
        if(_.head(Object.keys(req.body)) === "searchByTitle") {
            Movies.find({title: _.head(Object.values(req.body))})
            .then(movie => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(movie)
                // res.json({title: movie.title, plot: movie.plot, actors: movie.actors})
            }, err => next(err))
            .catch(err => next(err))
        }
        else if(_.head(Object.keys(req.body)) === "searchByPlot") {
            Movies.find({plot: _.head(Object.values(req.body))})
            .then(movie => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(movie)
                // res.json({title: movie.title, plot: movie.plot, actors: movie.actors})
            }, err => next(err))
            .catch(err => next(err))
        }
        else if(_.head(Object.keys(req.body)) === "searchByActor") {
            Movies.find({actors: _.head(Object.values(req.body))})
            .then(movie => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(movie)
                // res.json({title: movie.title, plot: movie.plot, actors: movie.actors})
            }, err => next(err))
            .catch(err => next(err))
        }
        else if(_.head(Object.keys(req.body)) === "searchByAll") {
            Movies.find({$or: [{title: _.head(Object.values(req.body))}, {$or: [{plot: _.head(Object.values(req.body))}, {actors: _.head(Object.values(req.body))}]}]})
            .then(movie => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(movie)
                // res.json({title: movie.title, plot: movie.plot, actors: movie.actors})
            }, err => next(err))
            .catch(err => next(err))
        }
        else {

        }
    
        // res.statusCode = 200
        // res.setHeader('Content-Type', 'application/json')
        // res.json({key: _.head(Object.keys(req.body)) , content: req.body})
    }
    else {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.json({status: 'unsuccessful'})
    }
})

module.exports = movieRouter