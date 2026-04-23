import mongoose from "mongoose";

const themeSchema = new mongoose.Schema({
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: "Anime", required: true, index: true },
  type: { type: String, enum: ["opening", "ending"], required: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  episodes: { type: String },
  youtubeUrl: { type: String },
  seasonNumber: { type: Number }
}, { timestamps: true });

export const Theme = mongoose.model("Theme", themeSchema);