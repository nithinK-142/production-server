import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: "Anime", required: true, index: true },
  site: { type: String, enum: ["myanimelist", "anilist", "imdb", "anidb", "kitsu", "rotten_tomatoes"], required: true },
  score: { type: Number, min: 0, max: 10, required: true },
  votes: { type: Number, default: 0 },
  url: { type: String }
}, { timestamps: true });

ratingSchema.index({ animeId: 1, site: 1 }, { unique: true });

export const Rating = mongoose.model("Rating", ratingSchema);