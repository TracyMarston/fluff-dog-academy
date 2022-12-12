const mongoose = require('mongoose');






const blogSchema = new mongoose.Schema({ 
    articlecode: { type: String, required: true, index: true},
    authorimage: { type: String, required: true, index: true}, 
    authorfirstname: { type: String, required: true},
    authorlastname: { type: String, required: true},
    authorbio:{ type: String, required: true},
    category:  { type: String, required: true, index: true},
    blogtitle: { type: String, required: true},
    blogdate: { type: String, required: true},
    blogimage: { type: String, required: true},
    blogshortdesc: { type: String, required: true},
    bloglongdesc: { type: String, required: true}  


});


module.exports = mongoose.model('blogs', blogSchema);
