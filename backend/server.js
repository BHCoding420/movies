const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "30mb",extended: true}));  
app.use(bodyParser.urlencoded({ limit: "30mb",extended: true})); 
app.use(cors());
app.use(express.json());

const uri = process.env.URI;

mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => app.listen(port, () => console.log(`Server running on port: ${port}`)))
    .catch((error) => console.log(error.message)); 



const moviesRouter = require('./routes/movies');
//const reviewRouter = require('./routes/reviews');

app.use('/movies', moviesRouter);
//app.use('/reviews', reviewRouter);

/*app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});*/ 

app.get('/',(req,res) => {
    res.send("working");
});