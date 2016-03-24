'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Politico = require('../models/Politico.js');

var Partido = new Schema({
    sigla: String,
    politicos: [{type: Schema.Types.ObjectId, ref: 'Politico'}]
});

module.exports = mongoose.model('Partido', Partido);