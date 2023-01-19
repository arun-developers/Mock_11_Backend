const mongoose = require('mongoose');

const UserModal = mongoose.model('user',{
    email :String,
    password:String
})

module.exports = {UserModal};