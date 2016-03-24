'use strict';

var Partido = require('../models/Partido.js');
var Politico = require('../models/Politico.js');

function PartidoHandler () {
    
    this.getPartido = function(req, res) {
        Partido
            .findOne({sigla: req.params.partido}, {_id: false})
            .exec(function(err, result) {
                if (err) throw err;

                res.json(result);
            });
    };

    this.getPoliticoPorPartido = function(req, res) {
        Politico
            .find({partido: req.params.partido}, {_id: false})
            .exec(function(err, result) {
                if (err) throw err;

                res.json(result);
            });
    };

    this.getPartidoLista = function(req, res) {
        Partido
            .find({}, {_id: false, politicos: false})
            .exec(function(err, result) {
                if (err) throw err;

                res.json(result);
            });
    };

    this.getPartidosPoliticos = function(req, res) {
        // TODO: RETORNAR TODOS OS POLÍTICOS DE TODOS OS PARTIDOS
        Partido
            .findOne({})
            .populate('politicos')
            .exec(function(err, result) {
                if (err) throw err;

                res.json(result);
            });
    };

    this.addPartido = function(req,  res) {
        console.log(req.body);

        Partido
            .findOneAndUpdate(
                {sigla: req.body.sigla}, 
                {sigla: req.body.sigla}, 
                {upsert: true}, 
                function(err, result) {
                    if (err) throw err;

                    res.redirect('/partido');
                }
            );
    };
}

module.exports = PartidoHandler;