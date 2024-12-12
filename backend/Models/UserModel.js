const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    user:{
        type:String
    },
    enrolledCourses:[]
})
const userModel = mongoose.model('user', Schema);
module.exports = userModel;