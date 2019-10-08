
module.exports = {
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