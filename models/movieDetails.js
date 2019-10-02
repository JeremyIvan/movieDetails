const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imdbObject = {
    id: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        required: true
    },
    votes: {
        type: Number,
        required: true
    }
}

const tomatoObject = {
    meter: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviews: {
        type: Number,
        required: true
    },
    fresh: {
        type: Number,
        required: true
    },
    consensus: {
        type: String,
        required: true
    },
    userMeter: {
        type: Number,
        required: true
    },
    userRating: {
        type: Number,
        required: true
    },
    userReviews: {
        type: Number,
        required: true
    }
}

const awardsObject = {
    wins: {
        type: Number,
        required: true
    },
    nominations: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}

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