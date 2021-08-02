const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

router.post('/signup', async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({email, password});
        await user.save(); 
        const token = jwt.sign({ userId: user._id }, 'secret_key');
        res.send({ token });
    } catch(err) {
        console.log(err);
        return res.send(err);
    }
});

router.post('/signin', async(req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(422).send({ error: 'Email and Password is must !' });
        }        
        const user = await User.findOne({ email });
        // console.log(user)
        if(!user) {
            return res.status(422).send({ error: 'User with given Email or Password doesnot exist !' });
        }
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, 'secret_key'); 
        res.send({ token });
    } catch(err) {
        console.log(err);
        return res.send(err);
    }
});

module.exports = router;