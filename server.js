'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var PartidoHandler = require(process.cwd() + '/app/controllers/partidoHandler.server.js');
var PoliticoHandler = require(process.cwd() + '/app/controllers/politicoHandler.server.js');

var app = express();

mongoose.connect('mongodb://localhost:27017/odebrecht');

// diretório dos recursos estáticos
app.use(express.static(__dirname + '/public'));

// configura handlebars como template engine
var handlebars = require('express-handlebars')
        .create({
            defaultLayout: 'default',
            helpers: {
                section: function(name, options) {
                    if (!this._sections) this._sections = {};
                    this._sections[name] = options.fn(this);
                    return null;
                }
            }
        });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));

var partidoHandler = new PartidoHandler();
var politicoHandler = new PoliticoHandler();

app.get('/', function(req, res) {
    res.render('index');
});

app.route('/partido')
    .get(function(req, res) {res.render('partido')})
    .post(partidoHandler.addPartido);

app.route('/politico')
    .get(partidoHandler.renderView)
    .post(politicoHandler.addPolitico)

// retorna todos os políticos
app.route('/api/politicos')
    .get(politicoHandler.getPoliticoLista);

// retorna todos os partidos
app.route('/api/partidos')
    .get(partidoHandler.getPartidoLista);

// retorna todos os políticos de determinado partido
app.route('/api/partidos/:partido')
    .get(partidoHandler.getPoliticoPorPartido);

// retorna todos os partidos e seus políticos
app.route('/api/all')
    .get(partidoHandler.getPartidosPoliticos);

app.listen(3000, function() {
    console.log('Listening on http://localhost:3000');
})