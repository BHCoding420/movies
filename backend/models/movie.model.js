const mongoose = require('mongoose');




const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

/*const reviewSchema = new Schema({
  
  username: {
    type: String,
    required: true,
    trim: true
   
    
  },
  comment: { type: String  }, 
  movie_id: { type: mongoose.Schema.Types.ObjectId, required:true },
  score: {type: Number, required:true },
  date: { type: Date, default: Date.now },   

}, {
  timestamps: true,
}); 
*/
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
    
  }, 
  creator: {
    creatorId: {type: Schema.Types.ObjectId,
    required: true,
    },
    creatorName: {type: String, required:true}
   
    
  },
  description: { type: String, required: true }, 
  Init_score: {type: Number, required:true },
  score: {type: Number, required:true,default: 0 },
  ReleaseDate: { type: Date,required:true},  
  tags:[String], 
  Cast:[String],
   
  LikedBy :[Schema.Types.ObjectId],
  NbOfLikes:{type: Number, required:true,default: 0 },
  SelectedImg: { type: String},
  UploadedAt: { type: Date,default: new Date()},   

}, {
  timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);
//const Review = mongoose.model('Review', reviewSchema);

exports.Movie = Movie;  
//exports.Review = Review;
 