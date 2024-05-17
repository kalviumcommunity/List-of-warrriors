const mongoose = require('mongoose')

const user = new mongoose.Schema({
        username : String,
        password : String 
})

const person = mongoose.model('users', user)

module.exports = person
