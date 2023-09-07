const mongoose = require("mongoose") 
const mongoosePaginate = require('mongoose-paginate');

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

userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("movies",userSchema);