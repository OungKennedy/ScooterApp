const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create scooter schema and model
const ScooterSchema = new Schema({
    geometry: {
        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            index: "2dsphere",
            required: true
        }
    }
});

const Scooter = mongoose.model('scooter', ScooterSchema);
module.exports = Scooter;