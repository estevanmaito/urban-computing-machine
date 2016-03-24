'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Partido = require('../models/Partido.js');

var Politico = new Schema({
    nome: String,
    estado: String,
    link: String,
    imagem: String,
    partido: {type: String, ref: 'Partido'}
});

module.exports = mongoose.model('Politico', Politico);