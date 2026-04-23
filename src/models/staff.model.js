import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: "Anime", required: true, index: true },
  name: { type: String, required: true },
  japaneseName: { type: String },
  role: { type: String, enum: ["director", "writer", "character_design", "music", "studio", "producer"] },
  contribution: { type: String },
  imageUrl: { type: String }
}, { timestamps: true });

export const Staff = mongoose.model("Staff", staffSchema);