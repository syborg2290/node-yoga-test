const express = require("express");
const createHttpError = require("http-errors");

// Routes
const indexRoutes = require("./routes/index");
const apiRoutes = require("./routes/api");
const userRoutes = require("./routes/user");
const sessionRoutes = require("./routes/session");
const lessonRoutes = require("./routes/lession");

const db = require("./config/config");

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
// app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Use routes
app.use("/", indexRoutes);
app.use("/api", apiRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1", sessionRoutes);
app.use("/api/v1", lessonRoutes);

app.use(() => {
  throw createHttpError(404, "Route not found !!");
});

// Sync the database
db.sync()
  .then(() => {
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database synchronization error:", error);
  });
