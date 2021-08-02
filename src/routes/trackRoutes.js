const express = require('express');
const auth = require('../middlewares/index');
const Track = require('../models/track');


const router = express.Router();

// router.use(auth);

router.get('/tracks', async(req, res) => {
    try {
        const tracks = await Track.find({ userId: req.user._id });
        res.send(tracks);
    } catch (err) {
        res.send({error: err.message});
    }
});

router.post('/tracks', async(req, res) => {
    const { name, locations } = req.body;
    if(!name || !locations) {
        res.status(422).send({error: 'You must provide a name and location!'});
    }
    try {
        const track = new Track({ name, locations, userId: req.user._id });
        await track.save();
        // console.log(track);
        res.send(track);
    } catch (err) {
        res.send({error: err.message});
    }
});

module.exports = router;