import mongoose from "mongoose";

const seasonSchema = new mongoose.Schema({
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: "Anime", required: true, index: true },
  seasonNumber: { type: Number, required: true },
  title: { type: String, required: true },
  episodes: { type: Number, required: true },
  startDate: { type: String },
  endDate: { type: String },
  rating: { type: Number, min: 0, max: 10 },
  synopsis: { type: String },
  coverImage: { type: String }
}, { timestamps: true });

seasonSchema.index({ animeId: 1, seasonNumber: 1 }, { unique: true });

export const Season = mongoose.model("Season", seasonSchema);