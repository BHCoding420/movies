const mongoose = require('mongoose');




const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const reviewSchema = new Schema({
  
  user: {
    userId:{
    type: Schema.Types.ObjectId,
    required: true,
    }, 

    userName: { type:String, required: true}
   
    
  },
  content: { type: String  }, 
  movie_id: { type: mongoose.Schema.Types.ObjectId, required:true },
  score: {type: Number, required:true },
  date: { type: Date, default: Date.now },   

}, {
  timestamps: true,
}); 

const Review = mongoose.model('Review', reviewSchema);
 
exports.Review = Review;