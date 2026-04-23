import mongoose from "mongoose";

const animeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    episodes: { type: Number, default: 0 },
    status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" },
    genres: [{ type: String }],
    rating: { type: Number, min: 0, max: 10 }
  },
  { timestamps: true }
);

export const Anime = mongoose.model("Anime", animeSchema);