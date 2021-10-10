const router = require('express').Router();
const NeasModel = require('../models/Neas');

// Endpoints relativos a NEAs
router.get('/', async (req, res, next) => {
    const _class = req.query.class;
    try {
      const result = await NeasModel.find({orbitClass:_class}, 
        { _id: 0, designation:1, periodYr: 1 }).lean()
  
      console.info('NEAs encontrados: ', result)
  
      res.status(200).json({
        success: true,
        data: result
      })
    } catch (error) {
      const errorMessage = 'Error al buscar los NEAs'
  
      console.error(`${errorMessage}: `, error.message)
  
      next(new Error(errorMessage))
    }
  })

  
  router.get('/date/', async (req, res, next) => {
    const to = new Date(req.query.to).toISOString();
    const from = new Date(req.query.from).toISOString();

    try {
        let result;
        if (to && from){
            result = await NeasModel.find({$and:[
                {discoveryDate: {$gt: new Date(from)}},
                {discoveryDate: {$lt: new Date(to)}}
            ]}, 
            { _id: 0, designation: 1, discoveryDate: 1, periodYr: 1}).lean()
        }
        
        else if (to){
            result = await NeasModel.find(
            {discoveryDate: {$lt: new Date(to)}},
            { _id: 0, designation: 1, discoveryDate: 1, periodYr: 1}).lean()
        }
        else if (from){
            result = await NeasModel.find(
            {discoveryDate: {$gt: new Date(from)}},
            { _id: 0, designation: 1, discoveryDate: 1, periodYr: 1}).lean()
        }
    
        console.info('NEAs encontrados: ', result)
    
        res.status(200).json({
          success: true,
          data: result
        })
      } catch (error) {
        const errorMessage = 'Error al buscar los NEAs'
    
        console.error(`${errorMessage}: `, error.message)
    
        next(new Error(errorMessage))
      }
  })

  router.get('/pha/:value', async (req, res, next) => {
    const value = req.params.value;
    try {
    let result;
    if (value === "1"){
        result = await NeasModel.find
        ({$and:[
            {pha:"Y"},
            {moidAu:{$lte: 0.05}},
            {hMag:{$lte: 22.0}}
        ]}, 
        { _id: 0, designation: 1, discoveryDate: 1, periodYr: 1}).lean()
    }
    else if (value === "0"){
        result = await NeasModel.find
        ({$and:[
            {pha:"N"},
            {moidAu:{$gt: 0.05}},
            {hMag:{$gt: 22.0}}
        ]}, 
        { _id: 0, designation: 1, discoveryDate: 1, periodYr: 1}).lean()
    }
    else if (value === "-1"){
        result = await NeasModel.find
        ({pha:"n/a"}, 
        { _id: 0, designation: 1, discoveryDate: 1, periodYr: 1}).lean()
    }

    console.info('NEAs encontrados: ', result)
  
      res.status(200).json({
        success: true,
        data: result
      })
    } catch (error) {
      const errorMessage = 'Error al buscar los NEAs'
  
      console.error(`${errorMessage}: `, error.message)
  
      next(new Error(errorMessage))
    }
  })

  router.get('/periods/', async (req, res, next) => {
    const to = parseInt(req.query.to);
    const from = parseInt(req.query.from);

    try {
        let result;
        if (to && from){
            result = await NeasModel.find({$and:[
                {periodYr: {$gt: from}},
                {periodYr: {$lt: to}}
            ]}, 
            { _id: 0, designation: 1, discoveryDate: 1, periodYr: 1}).lean()
        }
        
        else if (to){
            result = await NeasModel.find(
            {periodYr: {$lt: to}},
            { _id: 0, designation: 1, discoveryDate: 1, periodYr: 1}).lean()
        }
        else if (from){
            result = await NeasModel.find(
            {periodYr: {$gt: from}},
            { _id: 0, designation: 1, discoveryDate: 1, periodYr: 1}).lean()
        }
    
        console.info('NEAs encontrados: ', result)
    
        res.status(200).json({
          success: true,
          data: result
        })
      } catch (error) {
        const errorMessage = 'Error al buscar los NEAs'
    
        console.error(`${errorMessage}: `, error.message)
    
        next(new Error(errorMessage))
      }
  })

module.exports = router;