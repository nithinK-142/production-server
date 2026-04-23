import express from "express";
import {
  createAnime,
  getAllAnime,
  getAnimeById,
  getAnimeWithFilters,
  updateAnime,
  deleteAnime,
  bulkCreateAnime,
  getAnimeStats,
  searchAnime
} from "../controllers/anime.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { 
  createAnimeSchema,
  updateAnimeSchema,
  deleteAnimeSchema,
  bulkCreateAnimeSchema,
  searchAnimeSchema,
  getAnimeByIdSchema,
  getAnimeWithFiltersSchema,
  listAnimeSchema,
  getAnimeStatsSchema
} from "../schemas/anime.schema.js";

const router = express.Router();

// ==================== CREATE ROUTES ====================
router.post("/create", validate(createAnimeSchema), createAnime);
router.post("/bulk-create", validate(bulkCreateAnimeSchema), bulkCreateAnime);

// ==================== READ ROUTES ====================
router.post("/list", validate(listAnimeSchema), getAllAnime);
router.post("/filters", validate(getAnimeWithFiltersSchema), getAnimeWithFilters);
router.post("/search", validate(searchAnimeSchema), searchAnime);
router.post("/stats", validate(getAnimeStatsSchema), getAnimeStats);
router.post("/get-by-id", validate(getAnimeByIdSchema), getAnimeById);

// ==================== UPDATE ROUTES ====================
router.post("/update", validate(updateAnimeSchema), updateAnime);

// ==================== DELETE ROUTES ====================
router.post("/delete", validate(deleteAnimeSchema), deleteAnime);

export default router;