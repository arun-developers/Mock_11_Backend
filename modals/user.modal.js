const mongoose = require('mongoose');

const UserModal = mongoose.model('user', {
    name: String,
    email: String,
    password: String
})

module.exports = { UserModal };