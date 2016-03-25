'use strict';

var Formidable = require('formidable');
var fs = require('fs');
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
        var form = new Formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            if (err) throw err;

            // TODO: TESTAR SE TEM IMAGEM OU NÃO
            var foto = files.foto;
            var dir = './public/img';
            var caminho = dir + '/' + foto.name;

            //fs.mkdirSync(dir);
            var src = fs.createReadStream(foto.path);
            var dest = fs.createWriteStream(caminho);

            src.pipe(dest);

            src.on('end', function() {
                fs.unlinkSync(foto.path);
            });

            Politico
                .findOneAndUpdate(
                    {nome: fields.nome}, 
                    {
                        nome: fields.nome,
                        estado: fields.estado,
                        link: fields.link,
                        imagem: 'img/' + files.foto.name,
                        partido: fields.partido                    
                    }, 
                    {upsert: true}, 
                    function(err, result) {
                        if (err) throw err;

                        res.redirect('/politico');
                    }
                );
            
        });
    };
}

module.exports = PoliticoHandler;