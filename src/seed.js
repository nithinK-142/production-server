// src/seed.js
import { connectDB } from "./config/db.js";
import { Anime } from "./models/anime.model.js";

await connectDB();

await Anime.deleteMany();

await Anime.insertMany([
  {
    title: "Naruto",
    episodes: 220,
    status: "completed",
    genres: ["action", "shounen"],
    rating: 8.5
  },
  {
    title: "Attack on Titan",
    episodes: 89,
    status: "completed",
    genres: ["action", "drama"],
    rating: 9.5
  },
  {
    title: "One Piece",
    episodes: 1100,
    status: "ongoing",
    genres: ["adventure"],
    rating: 9
  }
]);

console.log("🌱 Seeded data");
process.exit();