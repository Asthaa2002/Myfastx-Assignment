const mongoose = require('mongoose');

const course_Schema = new mongoose.Schema({
     title: {
        type: String
     },
     description: {
        type: String
     },
     image: {
        name: {
            type: String,
        },
        path: {
            type: String,
        }
     },
    chapter: {
        type:String,
    },
    chapterList: {
        chapterNo:{type:Number},
        chapterName: {type:String},
        chapterData: {type:String},
    } ,
    amount: {
        type: Number,
    }

})

module.exports = mongoose.model('Course',course_Schema)