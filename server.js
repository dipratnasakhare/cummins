const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/db");

const userRoutes = require("./routes/userRoutes");
const adminPortalRoutes = require("./routes/adminPortalRoutes");


const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/adminPortal", adminPortalRoutes);



// Deployment setup
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("WELCOME TO CUMMINS API");
  });
}

// Error Handling Middlewares
app.use(notFound);      // 404 handler
app.use(errorHandler);  // Global error handler

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
