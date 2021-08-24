const express = require('express');
const subscriber = require('../model/subscriber');
const router = express.Router();
const Subscriber = require('../model/subscriber');

// Get all
router.get('/', async (req, res) => {
    try{
        const subscribers = await Subscriber.find();
        res.send(subscribers);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
// Get one
router.get('/:id', getSubscriber, (req, res) => {
    res.send(req.subscriber.name);
});
// Create one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribesToChannel: req.body.subscribesToChannel,
    });

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber); // 201 means 'Successfully created object'
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});
// Update one
router.patch('/:id', getSubscriber, async (req, res) => { // 'patch' only updates passed values. 'put' updates all values reqardless what was sent.
    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
    }
    if (req.body.subscribesToChannel != null) {
        res.subscriber.subscribesToChannel = req.body.subscribesToChannel;
    }
    try {
        const updatedSubscriber = await res.subscriber.patch();
        res.json(updatedSubscriber);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});
// Delete one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.deleteOne();
        res.json('Deleted subscriber');
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

async function getSubscriber(req, res, next){
    let subscriber;
    try {
        subscriber = Subscriber.findById(req.params.id);
        if (subscriber ==  null) {
            res.status(404).json({message: 'Cannot find subscriber'});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
    }

    res.subscriber = subscriber;
    next();
}

module.exports = router;