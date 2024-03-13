const course_Schema = require('../models/course');
// const fs = require('fs');


exports.createCourse = async (req, res) => {
    try {
        const { title, description, chapter,  amount } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const { fileName, path } = req.file;

        const course = new course_Schema({
            title,
            description,
            image: {
                name: fileName,
                path: path,
            },
            chapter,
            amount,
        })

        const result = await course.save();
        res.status(201).json({ message: "Course added", result: result })


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.retrieveCourses = async (req, res) => {

    try {
        const findCourse = await course_Schema.find()
        if (!findCourse) {
            res.status(404).json({ message: "no course found " });
        }
     res.status(200).json({ message: "course fetched !!", findCourse });


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.updateCourse = async (req, res) => {
    const { courseid } = req.params;
    try {
        const updateData = req.body;
        const myCourse = await course_Schema.findById(courseid);
        if (!myCourse) {
            return res.status(404).json({ message: "Course not found" });
        }


        if (req.file) {
            updateData.image = {
                path: req.file.path
            };

        }


        Object.assign(myCourse, updateData);


        const result = await myCourse.save();

        res.status(200).json({ message: "Course updated successfully", result: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
