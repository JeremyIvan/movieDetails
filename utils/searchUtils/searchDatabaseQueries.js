const _ = require('lodash');

const Movies = require('../../models/movieModels/movieDetails');

exports.searchByTitle = (req) => Movies.find({ title: new RegExp(_.head(Object.values(req.body)), 'ig') });

exports.searchByPlot = (req) => Movies.find({ plot: new RegExp(_.head(Object.values(req.body)), 'ig') });

exports.searchByActor = (req) => Movies.find({ actors: new RegExp(_.head(Object.values(req.body)), 'ig') });

exports.searchByGenre = (regexGenreList) => Movies.find({ genres: { $all: regexGenreList } });

exports.searchByAll = (req) => Movies.find(
  {
    $or: [
      { title: new RegExp(_.head(Object.values(req.body)), 'ig') },
      { plot: new RegExp(_.head(Object.values(req.body)), 'ig') },
      { actors: new RegExp(_.head(Object.values(req.body)), 'ig') },
    ],
  },
);
