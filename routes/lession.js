const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessionController");
const verifyToken = require("../middleware/tokenVerifier");

// Routes for lessons
router.post("/lesson", verifyToken, lessonController.createLesson);
router.get("/lesson", verifyToken, lessonController.getLessonById);
router.get("/lessons", verifyToken, lessonController.getAllLessons);

module.exports = router;
