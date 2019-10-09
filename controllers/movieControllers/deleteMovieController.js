const Movies = require('../../models/movie/movieDetails')

exports.deleteMovieById = (req, res, next) => {
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
}