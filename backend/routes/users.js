const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router(); 

const validator = (name,email, password) => {
    let errors = {nameError : "",emailError : "",passwordError : ""}
    const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    
    if(name.length <6) {
        errors.nameError = " name should be more than 6 characters"
    }
    
    if( !regEmail.test(email) ) {
        errors.emailError = "please enter a valid email"
    } 
    if ( !regPassword.test(password) ) {
        errors.passwordError = "password should be between 6 to 20 characters and should contain at least one numeric digit, one uppercase and one lowercase letter"
    } 

    return errors;

}
router.route('/').get(async(req, res,next) => {
    try{
      await User.find()
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    catch(err){
      console.log(err);
    }
    
}); 

router.post("/", async (req, res) => { 
    const { name,email, password } = req.body;
    try {
        let errors  = validator(name,email,password);
        if (errors.nameError != "" || errors.emailError != "" || errors.passwordError != "") {
            console.log("validation errrrror");
            throw errors;
        }

        const user = new User({ name,email, password });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        res.send(user);
    } catch (error) {
        //console.log(error); 

        if(error.code == "11000"){
            res.status(400).send({emailError:"Email already exists"})
        }
        res.status(400).send(error);
    }
});

router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -__v");
        res.send(user);
    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
});

module.exports = router;