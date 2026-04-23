import mongoose from "mongoose";

const relatedAnimeSchema = new mongoose.Schema({
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: "Anime", required: true, index: true },
  relatedAnimeId: { type: mongoose.Schema.Types.ObjectId, ref: "Anime", required: true },
  relationType: { type: String, enum: ["prequel", "sequel", "side_story", "spin_off", "alternative", "summary"], required: true }
}, { timestamps: true });

relatedAnimeSchema.index({ animeId: 1, relatedAnimeId: 1 }, { unique: true });

export const RelatedAnime = mongoose.model("RelatedAnime", relatedAnimeSchema);