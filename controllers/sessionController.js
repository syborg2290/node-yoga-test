// sessionController.js

const Lesson = require("../models/Lesson");
const Session = require("../models/Session");

// Controller to create a new session
exports.createSession = async (req, res) => {
  try {
    const { title, instructor, category, image } = req.body;

    // Validate input (simplified validation)
    if (!title || !instructor || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new session
    const session = await Session.create({
      title,
      instructor,
      category,
      image,
    });

    res.status(201).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to get a session by ID
exports.getSessionById = async (req, res) => {
  try {
    const sessionId = req.query.id;

    // Find the session by ID and include its associated lessons
    const session = await Session.findByPk(sessionId, {
      include: [{ all: true }],
    });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Generate image URL for the session's image
    const imageUrl = generateImageUrl(session.image, req);

    // Fetch all lessons with the same sessionId
    const lessons = await Lesson.findAll({
      where: { sessionId: session.id },
    });

    // Add imageUrl to the session data
    const sessionData = {
      ...session.toJSON(),
      imageUrl,
      lessons: lessons.map((lesson) => {
        const videoUrl = generateVideoUrl(lesson.video, req);
        return { ...lesson.toJSON(), videoUrl };
      }),
    };

    res.status(200).json(sessionData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to get a list of all sessions
exports.getAllSessions = async (req, res) => {
  try {
    // Find all sessions
    const sessions = await Session.findAll();

    // Fetch lessons for each session and append them
    const sessionsWithImages = [];
    for (const session of sessions) {
      // Generate image URL for the session's image
      const imageUrl = generateImageUrl(session.image, req);

      // Fetch all lessons with the same sessionId
      const lessons = await Lesson.findAll({
        where: { sessionId: session.id },
      });

      // Append lessons to the session data
      const sessionData = {
        ...session.toJSON(),
        imageUrl,
        lessons: lessons.map((lesson) => {
          const videoUrl = generateVideoUrl(lesson.video, req);
          return { ...lesson.toJSON(), videoUrl };
        }),
      };

      sessionsWithImages.push(sessionData);
    }

    res.status(200).json(sessionsWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

generateImageUrl = (filename, req) => {
  try {
    // Generate and send the image URL
    const imageUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/images/${filename}`;

    return imageUrl;
  } catch (error) {
    console.error("Error generating image URL:", error);
    return res.status(500).json({ message: "Error generating image URL." });
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
