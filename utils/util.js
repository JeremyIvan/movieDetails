const _ = require('lodash')

exports.extractFields = (data, fields) => {
    const extract_fields = (rec) => {
        let res = {}
        fields.forEach((path) => {
            res[path] = _.get(rec, path)
        })
        return res
    }

    const results = _(data)
        .map(extract_fields)
        .value()

    return results
}

// exports.searchItems = (searchId) => {
//     Movies.find({title: new RegExp(_.head(Object.values(req.body)), 'g')})
//             .then(movies => {
//                 res.statusCode = 200
//                 res.setHeader('Content-Type', 'application/json')
//                 res.json(utils.extractFields(movies, fields))
//             }, err => next(err))
//             .catch(err => next(err))
// }

exports.changeImage = (poster) => {
    let posterLink = poster
    let changeString = "https"
    let regex = /https?/g

    let output = posterLink.replace(regex, changeString)

    return output
}