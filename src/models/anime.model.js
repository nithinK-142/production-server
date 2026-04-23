import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  japaneseTitle: { type: String, required: true },
  romajiTitle: { type: String },
  englishTitle: { type: String },
  synonyms: [{ type: String }],
  coverImage: { type: String },
  bannerImage: { type: String },
  trailerUrl: { type: String },
  description: { type: String, required: true },
  synopsis: { type: String },
  background: { type: String },
  episodes: { type: Number, default: 0, min: 0 },
  episodeDuration: { type: Number },
  status: { type: String, enum: ["ongoing", "completed", "hiatus", "upcoming", "cancelled"], default: "ongoing" },
  startDate: { type: String },
  endDate: { type: String },
  airingSeason: { type: String, enum: ["winter", "spring", "summer", "fall"] },
  airingYear: { type: Number },
  averageRating: { type: Number, min: 0, max: 10, default: 0 },
  popularity: { type: Number, default: 0 },
  favorites: { type: Number, default: 0 },
  rank: { type: Number },
  genres: [{ type: String }],
  themes: [{ type: String }],
  demographic: { type: String, enum: ["shounen", "shoujo", "seinen", "josei", "kids", "all"] },
  ageRating: { type: String, enum: ["G", "PG", "PG-13", "R", "R+", "Rx"] },
  source: { type: String, enum: ["manga", "light_novel", "original", "visual_novel", "game", "novel", "web_manga", "webtoon", "other"] },
  studio: { type: String },
  producer: [{ type: String }],
  licensor: [{ type: String }],
  website: { type: String },
  myanimelistUrl: { type: String },
  anilistUrl: { type: String },
  crunchyrollUrl: { type: String },
  netflixUrl: { type: String },
  wikipediaUrl: { type: String },
  watchCount: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  tags: [{ type: String }],
  awards: [{ type: String }]
}, { timestamps: true });

animeSchema.index({ title: "text", description: "text", synopsis: "text" });
animeSchema.index({ genres: 1, status: 1, averageRating: -1 });
animeSchema.index({ popularity: -1 });

export const Anime = mongoose.model("Anime", animeSchema);