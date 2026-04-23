import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: "Anime", required: true, index: true },
  name: { type: String, required: true },
  japaneseName: { type: String },
  role: { type: String, enum: ["main", "supporting", "minor", "antagonist"] },
  voiceActor: { type: String },
  japaneseVoiceActor: { type: String },
  description: { type: String },
  imageUrl: { type: String }
}, { timestamps: true });

export const Character = mongoose.model("Character", characterSchema);