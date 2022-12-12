const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({ 
    code: { type: String, required: true, index: true}, 
    image: { type: String, required: true, index: true}, 
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    title: { type: String, required: true},
    email: { type: String, required: true},
    certification: { type: String, required: true},
    bio: { type: String, required: true}


});

module.exports = mongoose.model('trainers', trainerSchema);