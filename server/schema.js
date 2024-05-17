const mongoose = require('mongoose')

const warrior = new mongoose.Schema({
        Warrior : String,
        BirthYear : Number,
        DeathYear : Number,
        State : String,
        FamousBattle : String,
        Image : String,
        created_by: String
      
})

const war = mongoose.model('warriors-collections', warrior)

module.exports = {war}
