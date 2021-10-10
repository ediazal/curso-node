const { Router } = require('express');

const route = require('express').Router();

// Middlewares para el enrutado general
// ...
route.use('/astronomy/landings', require('./landings'));
route.use('/astronomy/neas', require('./neas'))

module.exports = route;
