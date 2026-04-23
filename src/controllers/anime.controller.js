import { Anime } from "../models/anime.model.js";
import { Season } from "../models/season.model.js";
import { Rating } from "../models/rating.model.js";
import { Character } from "../models/character.model.js";
import { Staff } from "../models/staff.model.js";
import { Theme } from "../models/theme.model.js";
import { RelatedAnime } from "../models/related-anime.model.js";
import { getTimestamp } from "../utils/logger.js";
import mongoose from "mongoose";

// ==================== HELPER FUNCTIONS ====================

const getCompleteAnime = async (animeId) => {
  const anime = await Anime.findById(animeId).lean();
  if (!anime) return null;

  const [seasons, ratings, characters, staff, themes, relatedAsMain, relatedAsRelated] = await Promise.all([
    Season.find({ animeId }).lean(),
    Rating.find({ animeId }).lean(),
    Character.find({ animeId }).lean(),
    Staff.find({ animeId }).lean(),
    Theme.find({ animeId }).lean(),
    RelatedAnime.find({ animeId }).populate("relatedAnimeId", "title japaneseTitle").lean(),
    RelatedAnime.find({ relatedAnimeId: animeId }).populate("animeId", "title japaneseTitle").lean()
  ]);

  const openingThemes = themes.filter(t => t.type === "opening");
  const endingThemes = themes.filter(t => t.type === "ending");

  const relatedAsSequel = relatedAsMain.map(r => ({
    anime: r.relatedAnimeId,
    relationType: r.relationType
  }));

  const relatedAsPrequel = relatedAsRelated.map(r => ({
    anime: r.animeId,
    relationType: r.relationType
  }));

  return {
    ...anime,
    seasons,
    ratings,
    characters,
    staff,
    openingThemes,
    endingThemes,
    relatedAnime: [...relatedAsSequel, ...relatedAsPrequel]
  };
};

// ==================== CREATE OPERATIONS ====================

export const createAnime = async (req, res) => {
  req.log.logs.push(`${getTimestamp()} : Create Anime - Start`);

  try {
    req.log.logs.push(`${getTimestamp()} : Create Anime - Checking if exists: ${req.body.title}`);
    
    const animeExists = await Anime.exists({ title: req.body.title });
    if (animeExists) {
      req.log.logs.push(`${getTimestamp()} : Create Anime - Failed: ${req.body.title} already exists`);
      return res.fail(`${req.body.title} already exists`);
    }

    const { seasons, ratings, characters, staff, openingThemes, endingThemes, relatedAnime, ...animeData } = req.body;

    req.log.logs.push(`${getTimestamp()} : Create Anime - Creating main document`);
    const anime = await Anime.create(animeData);
    const animeId = anime._id;
    req.log.logs.push(`${getTimestamp()} : Create Anime - Created with ID: ${animeId}`);

    // Create seasons if provided
    if (seasons && seasons.length) {
      req.log.logs.push(`${getTimestamp()} : Create Anime - Adding ${seasons.length} seasons`);
      const seasonsWithAnimeId = seasons.map(season => ({
        ...season,
        animeId
      }));
      await Season.create(seasonsWithAnimeId);
    }

    // Create ratings if provided
    if (ratings && ratings.length) {
      req.log.logs.push(`${getTimestamp()} : Create Anime - Adding ${ratings.length} ratings`);
      const ratingsWithAnimeId = ratings.map(rating => ({
        ...rating,
        animeId
      }));
      await Rating.create(ratingsWithAnimeId);
    }

    // Create characters if provided
    if (characters && characters.length) {
      req.log.logs.push(`${getTimestamp()} : Create Anime - Adding ${characters.length} characters`);
      const charactersWithAnimeId = characters.map(character => ({
        ...character,
        animeId
      }));
      await Character.create(charactersWithAnimeId);
    }

    // Create staff if provided
    if (staff && staff.length) {
      req.log.logs.push(`${getTimestamp()} : Create Anime - Adding ${staff.length} staff members`);
      const staffWithAnimeId = staff.map(member => ({
        ...member,
        animeId
      }));
      await Staff.create(staffWithAnimeId);
    }

    // Create themes if provided
    if (openingThemes && openingThemes.length) {
      req.log.logs.push(`${getTimestamp()} : Create Anime - Adding ${openingThemes.length} opening themes`);
      const themesWithAnimeId = openingThemes.map(theme => ({
        ...theme,
        animeId,
        type: "opening"
      }));
      await Theme.create(themesWithAnimeId);
    }

    if (endingThemes && endingThemes.length) {
      req.log.logs.push(`${getTimestamp()} : Create Anime - Adding ${endingThemes.length} ending themes`);
      const themesWithAnimeId = endingThemes.map(theme => ({
        ...theme,
        animeId,
        type: "ending"
      }));
      await Theme.create(themesWithAnimeId);
    }

    // Create related anime if provided
    if (relatedAnime && relatedAnime.length) {
      req.log.logs.push(`${getTimestamp()} : Create Anime - Adding ${relatedAnime.length} related anime relationships`);
      const relatedWithAnimeId = relatedAnime.map(relation => ({
        ...relation,
        animeId
      }));
      await RelatedAnime.create(relatedWithAnimeId);
    }

    req.log.logs.push(`${getTimestamp()} : Create Anime - Completed`);

    const completeAnime = await getCompleteAnime(animeId);

    return res.success(completeAnime, "Anime created successfully");
  } catch (error) {
    req.log.logs.push(`${getTimestamp()} : Create Anime - Error: ${error.message}`);
    return res.fail(error.message);
  }
};

export const bulkCreateAnime = async (req, res) => {
  req.log.logs.push(`${getTimestamp()} : Bulk Create Anime - Start`);

  try {
    const animeList = req.body;
    req.log.logs.push(`${getTimestamp()} : Bulk Create Anime - Processing ${animeList.length} anime`);
    
    const results = [];

    for (let i = 0; i < animeList.length; i++) {
      const animeData = animeList[i];
      req.log.logs.push(`${getTimestamp()} : Bulk Create Anime - Processing ${i + 1}/${animeList.length}: ${animeData.title}`);
      
      const { seasons, ratings, characters, staff, openingThemes, endingThemes, relatedAnime, ...mainData } = animeData;

      // Check if anime already exists
      const animeExists = await Anime.exists({ title: mainData.title });
      if (animeExists) {
        req.log.logs.push(`${getTimestamp()} : Bulk Create Anime - Skipped: ${mainData.title} already exists`);
        results.push({ title: mainData.title, status: "skipped", reason: "Already exists" });
        continue;
      }

      // Create anime
      const anime = await Anime.create(mainData);
      const animeId = anime._id;
      req.log.logs.push(`${getTimestamp()} : Bulk Create Anime - Created: ${mainData.title} with ID: ${animeId}`);

      // Create related data
      if (seasons?.length) {
        await Season.create(seasons.map(s => ({ ...s, animeId })));
      }
      if (ratings?.length) {
        await Rating.create(ratings.map(r => ({ ...r, animeId })));
      }
      if (characters?.length) {
        await Character.create(characters.map(c => ({ ...c, animeId })));
      }
      if (staff?.length) {
        await Staff.create(staff.map(s => ({ ...s, animeId })));
      }
      if (openingThemes?.length) {
        await Theme.create(openingThemes.map(t => ({ ...t, animeId, type: "opening" })));
      }
      if (endingThemes?.length) {
        await Theme.create(endingThemes.map(t => ({ ...t, animeId, type: "ending" })));
      }
      if (relatedAnime?.length) {
        await RelatedAnime.create(relatedAnime.map(r => ({ ...r, animeId })));
      }

      results.push({ title: mainData.title, id: animeId, status: "created" });
    }

    req.log.logs.push(`${getTimestamp()} : Bulk Create Anime - Completed. Created: ${results.filter(r => r.status === "created").length}, Skipped: ${results.filter(r => r.status === "skipped").length}`);

    return res.success(results, "Bulk create completed");
  } catch (error) {
    req.log.logs.push(`${getTimestamp()} : Bulk Create Anime - Error: ${error.message}`);
    return res.fail(error.message);
  }
};

// ==================== READ OPERATIONS ====================

export const getAllAnime = async (req, res) => {
  req.log.logs.push(`${getTimestamp()} : Fetch all anime - Start`);

  const { page = 1, limit = 50, genre, status, sortBy = "popularity", order = "desc" } = req.body;
  
  req.log.logs.push(`${getTimestamp()} : Fetch all anime - Filters: page=${page}, limit=${limit}, genre=${genre}, status=${status}`);
  
  const query = {};
  if (genre) query.genres = genre;
  if (status) query.status = status;

  const sortOptions = {};
  sortOptions[sortBy] = order === "desc" ? -1 : 1;

  const list = await Anime.find(query)
    .sort(sortOptions)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Anime.countDocuments(query);
  
  req.log.logs.push(`${getTimestamp()} : Fetch all anime - Completed. Found ${list.length} records out of ${total} total`);

  return res.success({
    count: list.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    list
  }, "Anime list retrieved");
};

export const getAnimeById = async (req, res) => {
  req.log.logs.push(`${getTimestamp()} : Fetch anime by ID - Start`);

  const { id } = req.body;
  req.log.logs.push(`${getTimestamp()} : Fetch anime by ID - ID: ${id}`);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.log.logs.push(`${getTimestamp()} : Fetch anime by ID - Invalid ID format`);
    return res.fail("Invalid anime ID");
  }

  const completeAnime = await getCompleteAnime(id);

  if (!completeAnime) {
    req.log.logs.push(`${getTimestamp()} : Fetch anime by ID - Anime not found`);
    return res.fail("Anime not found");
  }

  req.log.logs.push(`${getTimestamp()} : Fetch anime by ID - Found: ${completeAnime.title}`);
  return res.success(completeAnime, "Anime retrieved successfully");
};

export const getAnimeWithFilters = async (req, res) => {
  req.log.logs.push(`${getTimestamp()} : Fetch anime with filters - Start`);

  const { 
    minRating, 
    maxRating, 
    year, 
    demographic, 
    ageRating,
    source,
    studio,
    genre,
    status,
    search,
    page = 1,
    limit = 50,
    sortBy = "popularity",
    order = "desc"
  } = req.body;

  req.log.logs.push(`${getTimestamp()} : Fetch anime with filters - Filters applied: ${JSON.stringify({ minRating, maxRating, year, demographic, genre, status })}`);

  const query = {};

  if (minRating) query.averageRating = { $gte: minRating };
  if (maxRating) query.averageRating = { ...query.averageRating, $lte: maxRating };
  if (demographic) query.demographic = demographic;
  if (ageRating) query.ageRating = ageRating;
  if (source) query.source = source;
  if (studio) query.studio = { $regex: studio, $options: "i" };
  if (genre) query.genres = genre;
  if (status) query.status = status;
  if (year) query.startDate = { $regex: year, $options: "i" };
  
  if (search) {
    req.log.logs.push(`${getTimestamp()} : Fetch anime with filters - Text search: ${search}`);
    query.$text = { $search: search };
  }

  const sortOptions = {};
  sortOptions[sortBy] = order === "desc" ? -1 : 1;

  const list = await Anime.find(query)
    .sort(sortOptions)
    .limit(limit)
    .skip((page - 1) * limit);

  const total = await Anime.countDocuments(query);
  
  req.log.logs.push(`${getTimestamp()} : Fetch anime with filters - Completed. Found ${list.length} records out of ${total} total`);

  return res.success({
    count: list.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    list
  }, "Filtered anime list");
};

export const searchAnime = async (req, res) => {
  req.log.logs.push(`${getTimestamp()} : Search Anime - Start`);

  const { q, limit = 20 } = req.body;
  req.log.logs.push(`${getTimestamp()} : Search Anime - Query: "${q}", Limit: ${limit}`);

  if (!q) {
    req.log.logs.push(`${getTimestamp()} : Search Anime - No search query provided`);
    return res.fail("Search query required");
  }

  const results = await Anime.find(
    { $text: { $search: q } },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(limit);

  req.log.logs.push(`${getTimestamp()} : Search Anime - Found ${results.length} results`);

  return res.success({
    query: q,
    count: results.length,
    results
  }, "Search completed");
};

export const getAnimeStats = async (req, res) => {
  req.log.logs.push(`${getTimestamp()} : Get Anime Statistics - Start`);

  const stats = await Promise.all([
    Anime.countDocuments(),
    Anime.aggregate([
      { $group: { _id: null, avgRating: { $avg: "$averageRating" }, totalEpisodes: { $sum: "$episodes" } } }
    ]),
    Anime.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]),
    Anime.aggregate([
      { $unwind: "$genres" },
      { $group: { _id: "$genres", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ])
  ]);

  req.log.logs.push(`${getTimestamp()} : Get Anime Statistics - Completed. Total Anime: ${stats[0]}`);

  return res.success({
    totalAnime: stats[0],
    averageRating: stats[1][0]?.avgRating || 0,
    totalEpisodes: stats[1][0]?.totalEpisodes || 0,
    statusBreakdown: stats[2],
    topGenres: stats[3]
  }, "Anime statistics retrieved");
};

// ==================== UPDATE OPERATIONS ====================

export const updateAnime = async (req, res) => {
  req.log.logs.push(`${getTimestamp()} : Update Anime - Start`);

  try {
    const { id, ...updateData } = req.body;
    req.log.logs.push(`${getTimestamp()} : Update Anime - ID: ${id}`);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.log.logs.push(`${getTimestamp()} : Update Anime - Invalid ID format`);
      return res.fail("Invalid anime ID");
    }

    const { seasons, ratings, characters, staff, openingThemes, endingThemes, relatedAnime, ...mainUpdate } = updateData;

    // Update main anime document
    req.log.logs.push(`${getTimestamp()} : Update Anime - Updating main document`);
    const anime = await Anime.findByIdAndUpdate(id, mainUpdate, { new: true });
    if (!anime) {
      req.log.logs.push(`${getTimestamp()} : Update Anime - Anime not found`);
      return res.fail("Anime not found");
    }

    // Update seasons (replace all)
    if (seasons) {
      req.log.logs.push(`${getTimestamp()} : Update Anime - Updating ${seasons.length} seasons`);
      await Season.deleteMany({ animeId: id });
      if (seasons.length) {
        const seasonsWithAnimeId = seasons.map(season => ({ ...season, animeId: id }));
        await Season.create(seasonsWithAnimeId);
      }
    }

    // Update ratings (replace all)
    if (ratings) {
      req.log.logs.push(`${getTimestamp()} : Update Anime - Updating ${ratings.length} ratings`);
      await Rating.deleteMany({ animeId: id });
      if (ratings.length) {
        const ratingsWithAnimeId = ratings.map(rating => ({ ...rating, animeId: id }));
        await Rating.create(ratingsWithAnimeId);
      }
    }

    // Update characters (replace all)
    if (characters) {
      req.log.logs.push(`${getTimestamp()} : Update Anime - Updating ${characters.length} characters`);
      await Character.deleteMany({ animeId: id });
      if (characters.length) {
        const charactersWithAnimeId = characters.map(character => ({ ...character, animeId: id }));
        await Character.create(charactersWithAnimeId);
      }
    }

    // Update staff (replace all)
    if (staff) {
      req.log.logs.push(`${getTimestamp()} : Update Anime - Updating ${staff.length} staff members`);
      await Staff.deleteMany({ animeId: id });
      if (staff.length) {
        const staffWithAnimeId = staff.map(member => ({ ...member, animeId: id }));
        await Staff.create(staffWithAnimeId);
      }
    }

    // Update themes (replace all)
    if (openingThemes || endingThemes) {
      req.log.logs.push(`${getTimestamp()} : Update Anime - Updating themes`);
      await Theme.deleteMany({ animeId: id });
      
      if (openingThemes && openingThemes.length) {
        const openingThemesWithId = openingThemes.map(theme => ({ ...theme, animeId: id, type: "opening" }));
        await Theme.create(openingThemesWithId);
      }
      
      if (endingThemes && endingThemes.length) {
        const endingThemesWithId = endingThemes.map(theme => ({ ...theme, animeId: id, type: "ending" }));
        await Theme.create(endingThemesWithId);
      }
    }

    // Update related anime (replace all)
    if (relatedAnime) {
      req.log.logs.push(`${getTimestamp()} : Update Anime - Updating ${relatedAnime.length} related anime relationships`);
      await RelatedAnime.deleteMany({ animeId: id });
      if (relatedAnime.length) {
        const relatedWithAnimeId = relatedAnime.map(relation => ({ ...relation, animeId: id }));
        await RelatedAnime.create(relatedWithAnimeId);
      }
    }

    req.log.logs.push(`${getTimestamp()} : Update Anime - Completed`);

    const completeAnime = await getCompleteAnime(id);

    return res.success(completeAnime, "Anime updated successfully");
  } catch (error) {
    req.log.logs.push(`${getTimestamp()} : Update Anime - Error: ${error.message}`);
    return res.fail(error.message);
  }
};

// ==================== DELETE OPERATIONS ====================

export const deleteAnime = async (req, res) => {
  req.log.logs.push(`${getTimestamp()} : Delete Anime - Start`);

  try {
    const { id } = req.body;
    req.log.logs.push(`${getTimestamp()} : Delete Anime - ID: ${id}`);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.log.logs.push(`${getTimestamp()} : Delete Anime - Invalid ID format`);
      return res.fail("Invalid anime ID");
    }

    // Delete all related data
    req.log.logs.push(`${getTimestamp()} : Delete Anime - Deleting related data`);
    
    const seasonsDeleted = await Season.deleteMany({ animeId: id });
    req.log.logs.push(`${getTimestamp()} : Delete Anime - Deleted ${seasonsDeleted.deletedCount} seasons`);
    
    const ratingsDeleted = await Rating.deleteMany({ animeId: id });
    req.log.logs.push(`${getTimestamp()} : Delete Anime - Deleted ${ratingsDeleted.deletedCount} ratings`);
    
    const charactersDeleted = await Character.deleteMany({ animeId: id });
    req.log.logs.push(`${getTimestamp()} : Delete Anime - Deleted ${charactersDeleted.deletedCount} characters`);
    
    const staffDeleted = await Staff.deleteMany({ animeId: id });
    req.log.logs.push(`${getTimestamp()} : Delete Anime - Deleted ${staffDeleted.deletedCount} staff members`);
    
    const themesDeleted = await Theme.deleteMany({ animeId: id });
    req.log.logs.push(`${getTimestamp()} : Delete Anime - Deleted ${themesDeleted.deletedCount} themes`);
    
    const relatedAsMainDeleted = await RelatedAnime.deleteMany({ animeId: id });
    const relatedAsRelatedDeleted = await RelatedAnime.deleteMany({ relatedAnimeId: id });
    req.log.logs.push(`${getTimestamp()} : Delete Anime - Deleted ${relatedAsMainDeleted.deletedCount + relatedAsRelatedDeleted.deletedCount} related anime relationships`);

    // Delete main anime document
    req.log.logs.push(`${getTimestamp()} : Delete Anime - Deleting main document`);
    const result = await Anime.findByIdAndDelete(id);

    if (!result) {
      req.log.logs.push(`${getTimestamp()} : Delete Anime - Anime not found`);
      return res.fail("Anime not found");
    }

    req.log.logs.push(`${getTimestamp()} : Delete Anime - Successfully deleted: ${result.title}`);

    return res.success({ deletedId: id, deletedTitle: result.title }, "Anime deleted successfully");
  } catch (error) {
    req.log.logs.push(`${getTimestamp()} : Delete Anime - Error: ${error.message}`);
    return res.fail(error.message);
  }
};