import express from "express";
import {
  createAnime,
  getAllAnime,
  updateAnime,
  deleteAnime
} from "../controllers/anime.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createAnimeSchema } from "../schemas/anime.schema.js";

const router = express.Router();

router.post("/create", validate(createAnimeSchema), createAnime);
router.post("/list", getAllAnime);
router.post("/update", updateAnime);
router.post("/delete", deleteAnime);

export default router;