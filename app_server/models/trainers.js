const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    _id: { type: String, required: true, index: true}, 
    employeeID: { type: String, required: true},
    employeeRank: { type: Number, required: true},
    image: { type: String, required: true, index: true}, 
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    title: { type: String, required: true},
    email: { type: String, required: true},
    certification: { type: String, required: true},
    bio: { type: String, required: true}


});

mongoose.model('trainers', trainerSchema)