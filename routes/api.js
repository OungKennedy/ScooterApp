const express = require('express');
const router = express.Router();
const Scooter = require('../models/scooter');

// return list of scooters within specific range of lat and lng, with a limit
router.get('/scooters', (req, res) => {
    var limit;

    // limit has a default of 25
    if (req.query.limit) {
        limit = req.query.limit;
    } else {
        // set default limit to 25
        limit = DEFAULT_LIMIT;
    }

    Scooter.aggregate().near({
        near: { 'type': 'Point',
                'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
            },
        maxDistance: parseFloat(req.query.maxDistance),
        spherical: true,    
        distanceField: "dis"
    }).limit(parseInt(limit))
    .then(scooters => res.json(scooters))
    .catch((err) => {
        if (limit < 1) {
            res.status(422).send({"message": "Limit must be positive (cannot be 0 as well)."});
        } else {
            console.log(err);
            res.status(500).send({"message": "Error finding scooters."});
        }
    });
});

// add a new scooter to db
router.post('/scooters', function(req, res, next){
    Scooter.create(req.body)
    .then(function(scooter){
        res.send(scooter);
    }).catch(next);
});

// remove an existing scooter from db
router.delete('/scooters/:id', function(req, res){
    Scooter
    .findByIdAndRemove({_id: req.params.id})
    .then(function(scooter){
        res.send(scooter);
    })
    .catch(err => res.status(404).json({success: false}));
});

// update existing scooter in db
router.put('/scooters/:id', function(req, res){
    Scooter
    .findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(function(){
        Scooter.findOne({_id: req.params.id})
            .then(function(scooter){
                res.send(scooter);
            });
    });
});

module.exports = router;