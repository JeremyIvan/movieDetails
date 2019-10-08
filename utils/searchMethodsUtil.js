const _ = require('lodash')

const Movies = require('../models/movieDetails')

const utils = require('./util')

exports.searchByTitle = (req, res, next, fields) => {
    Movies.find({title: new RegExp(_.head(Object.values(req.body)), 'ig')})
            .then(movies => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')

                movies.forEach(movie => {
                    if(movie.poster != null){
                        let newPosterLink = utils.changeImage(movie.poster)
                        movie.poster = newPosterLink
                    }
                })

                res.json(utils.extractFields(movies, fields))
            }, err => next(err))
            .catch(err => next(err))
}

exports.searchByPlot = (req, res, next, fields) => {
    Movies.find({plot: new RegExp(_.head(Object.values(req.body)), 'ig')})
    .then(movies => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')

        movies.forEach(movie => {
            if(movie.poster != null){
                let newPosterLink = utils.changeImage(movie.poster)
                movie.poster = newPosterLink
            }
        })

        res.json(utils.extractFields(movies, fields))
    }, err => next(err))
    .catch(err => next(err))
}

exports.searchByActor = (req, res, next, fields) => {
    Movies.find({actors: new RegExp(_.head(Object.values(req.body)), 'ig')})
    .then(movies => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')

        movies.forEach(movie => {
            if(movie.poster != null){
                let newPosterLink = utils.changeImage(movie.poster)
                movie.poster = newPosterLink
            }
        })

        res.json(utils.extractFields(movies, fields))
    }, err => next(err))
    .catch(err => next(err))
}

exports.searchByGenre = (req, res, next, fields) => {
    let genreList = _.head(Object.values(req.body)).split(',')

    Movies.find({genres: {$all: new RegExp(genreList.join('|'), 'ig')}})
    .then(movies => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')

        movies.forEach(movie => {
            if(movie.poster != null){
                let newPosterLink = utils.changeImage(movie.poster)
                movie.poster = newPosterLink
            }
        })

        res.json(utils.extractFields(movies, fields))
    }, err => next(err))
    .catch(err => next(err))
}

exports.searchByMpaaRating = (req, res, next, fields) => {
    Movies.find({rated: new RegExp(_.head(Object.values(req.body)), 'ig')})
    .then(movies => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')

        movies.forEach(movie => {
            if(movie.poster != null){
                let newPosterLink = utils.changeImage(movie.poster)
                movie.poster = newPosterLink
            }
        })

        res.json(utils.extractFields(movies, fields))
    }, err => next(err))
    .catch(err => next(err))
}

exports.searchByAll = (req, res, next, fields) => {
    Movies.find(
        { $or: [
            {title: new RegExp(_.head(Object.values(req.body)), 'ig')}, 
            {$or: [
                {plot: new RegExp(_.head(Object.values(req.body)), 'ig')}, 
                {actors: new RegExp(_.head(Object.values(req.body)), 'ig')}
            ]}
        ]}
    )
    .then(movies => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')

        movies.forEach(movie => {
            if(movie.poster != null){
                let newPosterLink = utils.changeImage(movie.poster)
                movie.poster = newPosterLink
            }
        })
        
        res.json(utils.extractFields(movies, fields))
    }, err => next(err))
    .catch(err => next(err))
}