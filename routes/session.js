const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");
const verifyToken = require("../middleware/tokenVerifier");

// Routes for sessions
router.post("/session", verifyToken, sessionController.createSession);
router.get("/session", verifyToken, sessionController.getSessionById);
router.get("/sessions", verifyToken, sessionController.getAllSessions);

module.exports = router;
