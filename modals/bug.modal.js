const mongoose = require('mongoose');

const BugModel = mongoose.model('bugs',{
    type:String,
    Id:Number
})

module.exports = { BugModel };