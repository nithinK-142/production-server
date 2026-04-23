import { Anime } from "../models/anime.model.js";
import { getTimestamp } from "../utils/logger.js";

export const createAnime = async (req, res) => {
  req.log.logs.push(`${getTimestamp()} : Create Anime`);

  const animeExists = await Anime.exists({ title: req.body.title })
  if (animeExists) throw new Error(`${req.body.title} already exists`)

  const anime = await Anime.create(req.body);

  req.log.logs.push(`${getTimestamp()} : Anime created`);

  return res.success(anime, "Anime created");
};

export const getAllAnime = async (req, res) => {
  req.log.logs.push(`${getTimestamp()} : Fetch all anime`);

  const list = await Anime.find().limit(50);

  return res.success({ count: list.length, list }, "Anime list");
};

export const updateAnime = async (req, res) => {
  req.log.logs.push(`${getTimestamp()} : Update Anime`);

  const { id, ...update } = req.body;

  const anime = await Anime.findByIdAndUpdate(id, update, { new: true });

  if (!anime) return res.fail("Anime not found");

  return res.success(anime, "Updated");
};

export const deleteAnime = async (req, res) => {
  req.log.logs.push(`${getTimestamp()} : Delete Anime`);

  const { id } = req.body;

  const result = await Anime.findByIdAndDelete(id);

  if (!result) return res.fail("Anime not found");

  return res.success({}, "Deleted");
};