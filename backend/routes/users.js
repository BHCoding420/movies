const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router(); 

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
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = new User(req.body);

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        res.send(user);
    } catch (error) {
        console.log(error);
        res.send("Email already exists");
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