// controllers/videoController.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const knex = require("knex")(require("../knexfile").development);


const VideoController = express.Router();

// Маршрут для получения списка демо видео
VideoController.get("/videos/demolist", (req, res) => {
  const demoVideosDirectory = path.join(__dirname, "uploads/demo_videos");
  const demoVideoFiles = fs.readdirSync(demoVideosDirectory);
  const demoVideoUrls = demoVideoFiles.map((file) => `/videos/demo/${file}`);
  res.json({ status: "success", demoVideoUrls });
});

const getPurchasedVideosFromDatabase = async (userId) => {
  try {
    const purchasedVideos = await knex("purchased_videos")
      .select("video_url")
      .where("user_id", userId);

    return purchasedVideos;
  } catch (error) {
    console.error("Error getting purchased videos from database:", error);
    throw error;
  }
};
// Маршрут для получения списка купленных видео
VideoController.get("/videos/purchasedlist/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Получение списка купленных видео из базы данных или каким-либо другим способом
    const purchasedVideos = await getPurchasedVideosFromDatabase(userId);

    // Формирование URL-адресов купленных видео
    const purchasedVideoUrls = purchasedVideos.map(
      (video) => `/videos/purchased/${video.fileName}`
    );

    res.json({ status: "success", purchasedVideoUrls });
  } catch (error) {
    console.error("Error getting purchased videos:", error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

// Маршрут для предоставления доступа к видео (демо или купленные)
VideoController.get("/videos/:type/:videoName", (req, res) => {
  const { type, videoName } = req.params;

  const videosDirectory =
    type === "demo"
      ? path.join(__dirname, "uploads/demo_videos")
      : path.join(__dirname, "uploads/purchased_videos");

  const filePath = path.join(videosDirectory, videoName);

  res.sendFile(filePath);
});

module.exports = VideoController;
