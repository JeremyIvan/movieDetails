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