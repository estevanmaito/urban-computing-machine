'use strict';

var Politico = require('../models/Politico.js');

function PoliticoHandler () {

    this.getPoliticoLista = function(req, res) {
        Politico
            .find({}, {_id: false})
            .exec(function(err, result) {
                if (err) throw err;

                res.json(result);
            });
    };

    this.addPolitico = function(req,  res) {
        console.log(req.body);

        var politico = new Politico(
            {
                nome: req.body.nome,
                estado: req.body.estado,
                link: req.body.link,
                partido: req.body.partido
            }
        );

        politico.save(function(err, result) {
            if (err) throw err;

            res.redirect('/politico');
        });
    };
}

module.exports = PoliticoHandler;