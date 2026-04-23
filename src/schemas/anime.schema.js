import { z } from "zod";

// Rating site schema
const ratingSiteSchema = z.object({
  site: z.enum(["myanimelist", "anilist", "imdb", "anidb", "kitsu", "rotten_tomatoes"]),
  score: z.number().min(0).max(10),
  votes: z.number().int().min(0).optional(),
  url: z.string().url().optional()
});

// Character schema
const characterSchema = z.object({
  name: z.string().min(1, "Character name is required"),
  japaneseName: z.string().optional(),
  role: z.enum(["main", "supporting", "minor", "antagonist"]),
  voiceActor: z.string().optional(),
  japaneseVoiceActor: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional()
});

// Staff schema
const staffSchema = z.object({
  name: z.string().min(1, "Staff name is required"),
  japaneseName: z.string().optional(),
  role: z.enum(["director", "writer", "character_design", "music", "studio", "producer"]),
  contribution: z.string().optional(),
  imageUrl: z.string().url().optional()
});

// Theme schema
const themeSchema = z.object({
  title: z.string().min(1, "Theme title is required"),
  artist: z.string().min(1, "Artist name is required"),
  episodes: z.string().optional(),
  youtubeUrl: z.string().url().optional(),
  seasonNumber: z.number().int().positive().optional()
});

// Season schema
const seasonSchema = z.object({
  seasonNumber: z.number().int().positive(),
  title: z.string().min(1, "Season title is required"),
  episodes: z.number().int().positive(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format").optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format").optional(),
  rating: z.number().min(0).max(10).optional(),
  synopsis: z.string().optional(),
  coverImage: z.string().url().optional()
});

// Related anime schema
const relatedAnimeSchema = z.object({
  relatedAnimeId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID"),
  relationType: z.enum(["prequel", "sequel", "side_story", "spin_off", "alternative", "summary"])
});

// List anime schema (POST /list)
export const listAnimeSchema = z.object({
  body: z.object({
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(50),
    genre: z.string().optional(),
    status: z.enum(["ongoing", "completed", "hiatus", "upcoming", "cancelled"]).optional(),
    sortBy: z.enum(["popularity", "averageRating", "rank", "startDate", "episodes", "title"]).optional().default("popularity"),
    order: z.enum(["asc", "desc"]).optional().default("desc")
  })
});

// Get anime by ID schema (POST /get-by-id)
export const getAnimeByIdSchema = z.object({
  body: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID")
  })
});

// Create anime schema (POST /create)
export const createAnimeSchema = z.object({
  body: z.object({
    // Basic Information
    title: z.string().min(1, "Title is required"),
    japaneseTitle: z.string().min(1, "Japanese title is required"),
    romajiTitle: z.string().optional(),
    englishTitle: z.string().optional(),
    synonyms: z.array(z.string()).optional(),
    
    // Media & Production
    coverImage: z.string().url().optional(),
    bannerImage: z.string().url().optional(),
    trailerUrl: z.string().url().optional(),
    studio: z.string().optional(),
    producer: z.array(z.string()).optional(),
    licensor: z.array(z.string()).optional(),
    
    // Content Details
    description: z.string().min(10, "Description must be at least 10 characters"),
    synopsis: z.string().optional(),
    background: z.string().optional(),
    
    // Episode Information
    episodes: z.number().int().min(0),
    episodeDuration: z.number().int().positive().optional(),
    
    // Status & Dates
    status: z.enum(["ongoing", "completed", "hiatus", "upcoming", "cancelled"]),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format").optional(),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format").optional(),
    airingSeason: z.enum(["winter", "spring", "summer", "fall"]).optional(),
    airingYear: z.number().int().min(1900).max(new Date().getFullYear() + 5).optional(),
    
    // Ratings
    averageRating: z.number().min(0).max(10).optional(),
    popularity: z.number().int().min(0).optional(),
    favorites: z.number().int().min(0).optional(),
    rank: z.number().int().min(0).optional(),
    
    // Content Classification
    genres: z.array(z.string()).min(1, "At least one genre is required"),
    themes: z.array(z.string()).optional(),
    demographic: z.enum(["shounen", "shoujo", "seinen", "josei", "kids", "all"]).optional(),
    ageRating: z.enum(["G", "PG", "PG-13", "R", "R+", "Rx"]).optional(),
    
    // Technical Details
    source: z.enum(["manga", "light_novel", "original", "visual_novel", "game", "novel", "web_manga", "webtoon", "other"]).optional(),
    
    // External Links
    website: z.string().url().optional(),
    myanimelistUrl: z.string().url().optional(),
    anilistUrl: z.string().url().optional(),
    crunchyrollUrl: z.string().url().optional(),
    netflixUrl: z.string().url().optional(),
    wikipediaUrl: z.string().url().optional(),
    officialForum: z.string().url().optional(),
    
    // Additional Fields
    tags: z.array(z.string()).optional(),
    awards: z.array(z.string()).optional(),
    
    // Related Data (for creation with all relations)
    seasons: z.array(seasonSchema).optional(),
    ratings: z.array(ratingSiteSchema).optional(),
    characters: z.array(characterSchema).optional(),
    staff: z.array(staffSchema).optional(),
    openingThemes: z.array(themeSchema).optional(),
    endingThemes: z.array(themeSchema).optional(),
    relatedAnime: z.array(relatedAnimeSchema).optional()
  })
});

// Update anime schema (POST /update)
export const updateAnimeSchema = z.object({
  body: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID"),
    
    // All fields are optional for update
    title: z.string().min(1).optional(),
    japaneseTitle: z.string().min(1).optional(),
    romajiTitle: z.string().optional(),
    englishTitle: z.string().optional(),
    synonyms: z.array(z.string()).optional(),
    coverImage: z.string().url().optional(),
    bannerImage: z.string().url().optional(),
    trailerUrl: z.string().url().optional(),
    studio: z.string().optional(),
    producer: z.array(z.string()).optional(),
    licensor: z.array(z.string()).optional(),
    description: z.string().min(10).optional(),
    synopsis: z.string().optional(),
    background: z.string().optional(),
    episodes: z.number().int().min(0).optional(),
    episodeDuration: z.number().int().positive().optional(),
    status: z.enum(["ongoing", "completed", "hiatus", "upcoming", "cancelled"]).optional(),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    airingSeason: z.enum(["winter", "spring", "summer", "fall"]).optional(),
    airingYear: z.number().int().min(1900).max(new Date().getFullYear() + 5).optional(),
    averageRating: z.number().min(0).max(10).optional(),
    popularity: z.number().int().min(0).optional(),
    favorites: z.number().int().min(0).optional(),
    rank: z.number().int().min(0).optional(),
    genres: z.array(z.string()).min(1).optional(),
    themes: z.array(z.string()).optional(),
    demographic: z.enum(["shounen", "shoujo", "seinen", "josei", "kids", "all"]).optional(),
    ageRating: z.enum(["G", "PG", "PG-13", "R", "R+", "Rx"]).optional(),
    source: z.enum(["manga", "light_novel", "original", "visual_novel", "game", "novel", "web_manga", "webtoon", "other"]).optional(),
    website: z.string().url().optional(),
    myanimelistUrl: z.string().url().optional(),
    anilistUrl: z.string().url().optional(),
    crunchyrollUrl: z.string().url().optional(),
    netflixUrl: z.string().url().optional(),
    wikipediaUrl: z.string().url().optional(),
    officialForum: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
    awards: z.array(z.string()).optional(),
    
    // Related data for update (will replace existing)
    seasons: z.array(seasonSchema).optional(),
    ratings: z.array(ratingSiteSchema).optional(),
    characters: z.array(characterSchema).optional(),
    staff: z.array(staffSchema).optional(),
    openingThemes: z.array(themeSchema).optional(),
    endingThemes: z.array(themeSchema).optional(),
    relatedAnime: z.array(relatedAnimeSchema).optional()
  })
});

// Delete anime schema (POST /delete)
export const deleteAnimeSchema = z.object({
  body: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID")
  })
});

// Bulk create anime schema (POST /bulk-create)
export const bulkCreateAnimeSchema = z.object({
  body: z.array(createAnimeSchema.shape.body).min(1).max(100)
});

// Search anime schema (POST /search)
export const searchAnimeSchema = z.object({
  body: z.object({
    q: z.string().min(1, "Search query is required"),
    limit: z.number().int().min(1).max(100).optional().default(20)
  })
});

// Get anime with filters schema (POST /filters)
export const getAnimeWithFiltersSchema = z.object({
  body: z.object({
    minRating: z.number().min(0).max(10).optional(),
    maxRating: z.number().min(0).max(10).optional(),
    year: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
    demographic: z.enum(["shounen", "shoujo", "seinen", "josei", "kids", "all"]).optional(),
    ageRating: z.enum(["G", "PG", "PG-13", "R", "R+", "Rx"]).optional(),
    source: z.enum(["manga", "light_novel", "original", "visual_novel", "game", "novel", "web_manga", "webtoon", "other"]).optional(),
    studio: z.string().optional(),
    genre: z.string().optional(),
    status: z.enum(["ongoing", "completed", "hiatus", "upcoming", "cancelled"]).optional(),
    search: z.string().optional(),
    page: z.number().int().min(1).optional().default(1),
    limit: z.number().int().min(1).max(100).optional().default(50),
    sortBy: z.enum(["popularity", "averageRating", "rank", "startDate", "episodes", "title"]).optional().default("popularity"),
    order: z.enum(["asc", "desc"]).optional().default("desc")
  })
});

// Get anime stats schema (POST /stats) - no validation needed as it has no parameters
export const getAnimeStatsSchema = z.object({
  body: z.object({}).optional()
});