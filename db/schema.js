const mongoose = require("mongoose") 

const userSchema = mongoose.Schema({
    title: String,
    genres: [String],
    runtime: Number,
    rated: String,
    year: Number,
    directors: [String],
    cast: [String],
    type: String,

})

module.exports = mongoose.model("movies",userSchema);