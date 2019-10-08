const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imdbObject = require('./imdb')
const tomatoObject = require('./tomato')
const awardsObject = require('./awards')

const movieSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    year: {
        type: Number,
        require: true
    },
    rated: {
        type: String,
        required: true
    },
    runtime: {
        type: Number,
        required: true
    },
    countries: {
        type: [String],
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    director: {
        type: String,
        required: true
    },
    writers: {
        type: [String],
        required: true
    },
    actors: {
        type: [String],
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    poster: String,
    imdb: imdbObject,
    tomato: tomatoObject,
    metacritic: Number,
    awards: awardsObject,
    type: {
        type: String,
        required: true
    }
})

let MovieDetails = mongoose.model("movieDetail", movieSchema, "movieDetails")
module.exports = MovieDetails