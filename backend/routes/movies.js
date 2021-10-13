const router = require('express').Router();
const { rawListeners } = require('../models/movie.model');
let MovieModel = require('../models/movie.model');

let Movie = MovieModel.Movie;

router.route('/').get(async(req, res,next) => {
  try{
    await Movie.find()
    .then(movies => res.json(movies))
    .catch(err => res.status(400).json('Error: ' + err));
  }
  catch(err){
    console.log(err);
  }
  
}); 

router.route('/add').post((req, res) => {
    const movie = req.body; 
    try{
      const newMovie =  new Movie(movie);
  
      newMovie.save()
      .then(() => res.json('Exercise added!' + newMovie))
      .catch(err => res.status(400).json('Error: ' + err));
    } 
    catch (err){
      console.log("error");
    }


    
  }); 

  router.route('/:id').get(async (req, res,next) => { 
    try{
      await Movie.findById(req.params.id)
      .then(movie => res.json(movie))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    catch(err){
      console.log(err);
    }
    
  });

  router.route('/:id').delete( async (req, res,next) => {
    try{
      await Movie.findByIdAndDelete(req.params.id)
      .then(() => res.json('movie deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));

    }
    catch (error) {
      console.log(error.message);
    }

    
  });
  
  router.route('/update/:id').patch( async (req, res,next) => 
  {
    try {
      const id = req.params.id; 
      const updates = req.body; 
      const options = { new:true}; 

      const result = await Movie.findByIdAndUpdate(id,updates,options); 
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
      
      
  } 
  )
   
    

  module.exports = router;