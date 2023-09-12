// lessonController.js

const Lesson = require("../models/Lesson");
const Session = require("../models/Session");

// Controller to create a new lesson
exports.createLesson = async (req, res) => {
  try {
    const { title, description, video, sessionId } = req.body;

    // Validate input (simplified validation)
    if (!title || !description || !video || !sessionId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the session with the provided sessionId exists
    const session = await Session.findByPk(sessionId);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Create a new lesson
    const lesson = await Lesson.create({
      title,
      description,
      video,
      sessionId: sessionId,
    });

    res.status(201).json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to get a lesson by ID
exports.getLessonById = async (req, res) => {
  try {
    const lessonId = req.query.id;

    // Find the lesson by ID
    const lesson = await Lesson.findByPk(lessonId);

    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    // Generate video URL for the lesson's video
    const videoUrl = generateVideoUrl(lesson.video, req);

    // Add videoUrl to the lesson data
    const lessonData = { ...lesson.toJSON(), videoUrl };

    res.status(200).json(lessonData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to get a list of all lessons
exports.getAllLessons = async (req, res) => {
  try {
    // Find all lessons
    const lessons = await Lesson.findAll();

    // Generate video URLs for each lessons
    const lessonsWithVideos = lessons.map((lesson) => {
      const videoUrl = generateVideoUrl(lesson.video, req);
      return { ...lesson.toJSON(), videoUrl };
    });

    res.status(200).json(lessonsWithVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

generateVideoUrl = (filename, req) => {
  try {
    // Generate and send the video URL
    const videoUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/videos/${filename}`;

    return videoUrl;
  } catch (error) {
    console.error("Error generating video URL:", error);
    return res.status(500).json({ message: "Error generating video URL." });
  }
};
