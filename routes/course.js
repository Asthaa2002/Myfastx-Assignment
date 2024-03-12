const express = require('express');
const courseController = require('../controllers/course');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
const upload = multer({ storage: storage });
const router = express.Router();
router.post('/create_course',upload.single("file"),courseController.createCourse);
router.get('/retrieve_course',courseController.retrieveCourses);
router.put('/update_course/:courseid',upload.single("file"),courseController.updateCourse);
module.exports = router;