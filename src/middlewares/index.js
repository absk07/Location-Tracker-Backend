const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) {
        return res.status(401).send({ error: 'Invalid authorization' });
    }
    const token = authorization.replace('Bearer ', '');
    // console.log(authorization);
    jwt.verify(token, 'secret_key', async(err, payload) => {
        if(err) {
            return res.status(401).send({ error: 'Invalid authorization' });
        }
        const {userId} = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    });
};