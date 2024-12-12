const mongooose = require('mongoose');

const Schema = new mongooose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    duration:{
        type:String
    },
    instructor:{
        type:String
    }
});

const courseModel = mongooose.model('course', Schema);
module.exports = courseModel;