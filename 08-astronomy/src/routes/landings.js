const router = require('express').Router();
const LandingModel = require('../models/Landings');

// Endpoints relativos a Landings
router.get('/', async (req, res, next) => {
    const minimum_mass = req.query.minimum_mass;
    try {
      const result = await LandingModel.find({mass:{$gt: parseInt(minimum_mass)}}, 
        { _id: 0, name:1, mass: 1 }).lean()
  
      console.info('Landings encontrados: ', result)
  
      res.status(200).json({
        success: true,
        data: result
      })
    } catch (error) {
      const errorMessage = 'Error al buscar los landings'
  
      console.error(`${errorMessage}: `, error.message)
  
      next(new Error(errorMessage))
    }
  })
router.get('/mass/:mass', async (req, res, next) => {
    const mass = req.params.mass;
    try {
      const result = await LandingModel.find({mass:parseInt(mass)}, 
      { _id: 0, name: 1, mass: 1}).lean()
  
      console.info('Landings encontrados: ', result)
  
      res.status(200).json({
        success: true,
        data: result
      })
    } catch (error) {
      const errorMessage = 'Error al buscar los landings'
  
      console.error(`${errorMessage}: `, error.message)
  
      next(new Error(errorMessage))
    }
  })

  router.get('/class/:class', async (req, res, next) => {
    const _class = req.params.class;
    try {
      const result = await LandingModel.find({recclass:_class}, 
      { _id: 0, name: 1, recclass: 1}).lean()
  
      console.info('Landings encontrados: ', result)
  
      res.status(200).json({
        success: true,
        data: result
      })
    } catch (error) {
      const errorMessage = 'Error al buscar los landings'
  
      console.error(`${errorMessage}: `, error.message)
  
      next(new Error(errorMessage))
    }
  })

  router.get('/year/', async (req, res, next) => {
    const to = new Date(req.query.to).toISOString();
    const from = new Date(req.query.from).toISOString();
    
    try {
        let result;
        if (to && from){
            result = await LandingModel.find({$and:[
                {year: {$gt: new Date(from)}},
                {year: {$lt: new Date(to)}}
            ]}, 
            { _id: 0, name: 1, mass: 1, year: 1}).lean()
        }
        
        else if (to){
            result = await LandingModel.find(
            {year: {$lt: new Date(to)}},
            { _id: 0, name: 1, mass: 1, year: 1}).lean()
        }
        else if (from){
            result = await LandingModel.find(
            {year: {$gt: new Date(from)}},
            { _id: 0, name: 1, mass: 1, year: 1}).lean()
        }
    
        console.info('Landings encontrados: ', result)
    
        res.status(200).json({
          success: true,
          data: result
        })
      } catch (error) {
        const errorMessage = 'Error al buscar los landings'
    
        console.error(`${errorMessage}: `, error.message)
    
        next(new Error(errorMessage))
      }
  })

  router.get('/:name', async (req, res, next) => {
    const name = req.params.name;
    try {
      const result = await LandingModel.find({name:name}, 
      { _id: 0, geolocation: 1}).lean()
  
      console.info('Landings encontrados: ', result)
  
      res.status(200).json({
        success: true,
        data: result
      })
    } catch (error) {
      const errorMessage = 'Error al buscar los landings'
  
      console.error(`${errorMessage}: `, error.message)
  
      next(new Error(errorMessage))
    }
  })

module.exports = router;
