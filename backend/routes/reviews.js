const router = require('express').Router();
const { rawListeners } = require('../models/review.model');
let ReviewModel = require('../models/review.model');

let Review = ReviewModel.Review;

router.route('/').get(async(req, res,next) => {
  try{
    await Review.find()
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json('Error: ' + err));
  }
  catch(err){
    console.log(err);
  }
  
}); 

router.route('/add').post((req, res) => {
    const review = req.body; 
    try{
      const newReview =  new Review(review);
  
      newReview.save()
      .then(() => res.json('Exercise added!' + newReview))
      .catch(err => res.status(400).json('Error: ' + err));
    } 
    catch (err){
      console.log("error");
    }


    
  }); 

  router.route('/:id').get(async (req, res,next) => { 
    try{
      await Review.findById(req.params.id)
      .then(Review => res.json(review))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    catch(err){
      console.log(err);
    }
    
  });

  router.route('/:id').delete( async (req, res,next) => {
    try{
      await Review.findByIdAndDelete(req.params.id)
      .then(() => res.json('review deleted.'))
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

      const result = await Review.findByIdAndUpdate(id,updates,options); 
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
      
      
  } 
  )
   
    

  module.exports = router;