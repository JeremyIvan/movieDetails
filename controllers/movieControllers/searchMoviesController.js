const _ = require('lodash')

const searchMethodUtil = require('../../utils/searchMethodsUtil')

exports.searchMovies = (req, res, next) => {
    let fields = ['_id', 'title', 'plot', 'actors', 'poster', 'rated', 'genres', 'banner', 'link']

    if(Object.keys(req.body).length === 1){
        if(_.head(Object.keys(req.body)) === "searchByTitle") {
            searchMethodUtil.searchByTitle(req, res, next, fields)
        }
        else if(_.head(Object.keys(req.body)) === "searchByPlot") {
            searchMethodUtil.searchByPlot(req, res, next, fields)
        }
        else if(_.head(Object.keys(req.body)) === "searchByActor") {
            searchMethodUtil.searchByActor(req, res, next, fields)
        }
        else if(_.head(Object.keys(req.body)) === "searchByGenre") {
            searchMethodUtil.searchByGenre(req, res, next, fields)
        }
        else if(_.head(Object.keys(req.body)) === "searchByMpaaRating") {
            searchMethodUtil.searchByMpaaRating(req, res, next, fields)
        }
        else if(_.head(Object.keys(req.body)) === "searchByAll") {
            searchMethodUtil.searchByAll(req, res, next, fields)
        }
        else {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.json({status: 'search method not supported'})
        }
    }
    else {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.json({status: 'unsuccessful'})
    }
}