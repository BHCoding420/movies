const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const EmailValidator = (email) => {
  const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if( !regEmail.test(email) ) {
    return false;
  } 
  return true;
}

const userSchema = new mongoose.Schema({ 
  name: {
    type: String,
    
    
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true, 
    
    
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
   
  }
});


userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id,name: this.name}, process.env.JWTPRIVATEKEY);
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (user) => {
  const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });
  return schema.validate(user);
};

module.exports = { User, validate };