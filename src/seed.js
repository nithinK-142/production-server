import { connectDB } from "./config/db.js";
import { Anime } from "./models/anime.model.js";
import { Season } from "./models/season.model.js";
import { Rating } from "./models/rating.model.js";
import { Character } from "./models/character.model.js";
import { Staff } from "./models/staff.model.js";
import { Theme } from "./models/theme.model.js";
import { RelatedAnime } from "./models/related-anime.model.js";

await connectDB();

// Clear all collections
await Anime.deleteMany();
await Season.deleteMany();
await Rating.deleteMany();
await Character.deleteMany();
await Staff.deleteMany();
await Theme.deleteMany();
await RelatedAnime.deleteMany();

// Main Anime Data
const animeDocuments = [
  {
    title: "Naruto",
    japaneseTitle: "ナルト",
    romajiTitle: "Naruto",
    englishTitle: "Naruto",
    description: "Naruto Uzumaki, a mischievous young ninja, dreams of becoming the Hokage, the leader of his village. However, he carries the Nine-Tailed Fox spirit within him, making him an outcast.",
    synopsis: "Follow Naruto's journey from a lonely troublemaker to a respected hero.",
    episodes: 220,
    episodeDuration: 23,
    status: "completed",
    startDate: "2002-10-03",
    endDate: "2007-02-08",
    averageRating: 8.5,
    popularity: 980000,
    favorites: 450000,
    rank: 45,
    genres: ["action", "adventure", "comedy", "drama", "shounen"],
    themes: ["ninja", "friendship", "perseverance", "redemption"],
    demographic: "shounen",
    ageRating: "PG-13",
    source: "manga",
    studio: "Studio Pierrot",
    producer: ["TV Tokyo", "Aniplex", "Pierrot"],
    myanimelistUrl: "https://myanimelist.net/anime/20/Naruto",
    tags: ["classic", "ninja", "long-running"],
    awards: ["Anime Grand Prix Award", "Shogakukan Manga Award"]
  },
  {
    title: "Naruto Shippuden",
    japaneseTitle: "ナルト疾風伝",
    romajiTitle: "Naruto Shippuden",
    englishTitle: "Naruto: Shippuden",
    description: "Two and a half years after leaving his village, Naruto Uzumaki returns as a more mature ninja. The Akatsuki organization threatens to capture all tailed beasts.",
    synopsis: "Naruto returns after training to face the Akatsuki and save his friend Sasuke.",
    episodes: 500,
    episodeDuration: 23,
    status: "completed",
    startDate: "2007-02-15",
    endDate: "2017-03-23",
    averageRating: 9.0,
    popularity: 1300000,
    favorites: 650000,
    rank: 25,
    genres: ["action", "adventure", "comedy", "drama", "shounen"],
    themes: ["ninja", "friendship", "war", "sacrifice", "redemption"],
    demographic: "shounen",
    ageRating: "PG-13",
    source: "manga",
    studio: "Studio Pierrot",
    producer: ["TV Tokyo", "Aniplex", "Pierrot"],
    myanimelistUrl: "https://myanimelist.net/anime/1735/Naruto__Shippuuden",
    tags: ["classic", "ninja", "long-running", "sequel"],
    awards: ["Anime Grand Prix Award"]
  },
  {
    title: "Attack on Titan",
    japaneseTitle: "進撃の巨人",
    romajiTitle: "Shingeki no Kyojin",
    englishTitle: "Attack on Titan",
    description: "In a world where humanity lives within walled cities to protect themselves from man-eating Titans, Eren Yeager swears revenge after a Titan destroys his home.",
    synopsis: "Humanity's last survivors live behind massive walls, but when a colossal Titan breaches their defenses, young Eren Yeager joins the fight for survival.",
    episodes: 89,
    episodeDuration: 24,
    status: "completed",
    startDate: "2013-04-07",
    endDate: "2023-11-05",
    averageRating: 9.5,
    popularity: 2100000,
    favorites: 890000,
    rank: 1,
    genres: ["action", "drama", "fantasy", "horror", "mystery"],
    themes: ["survival", "war", "betrayal", "freedom", "genocide"],
    demographic: "shounen",
    ageRating: "R",
    source: "manga",
    studio: "Wit Studio, MAPPA",
    producer: ["Pony Canyon", "Kodansha", "Production I.G"],
    myanimelistUrl: "https://myanimelist.net/anime/16498/Shingeki_no_Kyojin",
    tags: ["masterpiece", "dark fantasy", "action", "controversial ending"],
    awards: ["Anime of the Year 2013", "Best Action Anime", "Crunchyroll Anime Awards"]
  },
  {
    title: "One Piece",
    japaneseTitle: "ワンピース",
    romajiTitle: "Wan Pīsu",
    englishTitle: "One Piece",
    description: "Monkey D. Luffy, a boy whose body gained rubber properties after eating a Devil Fruit, dreams of becoming the Pirate King.",
    synopsis: "Join Monkey D. Luffy and his Straw Hat Pirates as they sail the Grand Line in search of the legendary treasure, One Piece.",
    episodes: 1100,
    episodeDuration: 24,
    status: "ongoing",
    startDate: "1999-10-20",
    averageRating: 9.0,
    popularity: 2800000,
    favorites: 1200000,
    rank: 12,
    genres: ["action", "adventure", "comedy", "drama", "fantasy", "shounen"],
    themes: ["pirates", "friendship", "freedom", "dreams", "found family"],
    demographic: "shounen",
    ageRating: "PG-13",
    source: "manga",
    studio: "Toei Animation",
    producer: ["Fuji TV", "Toei Animation", "Shueisha"],
    myanimelistUrl: "https://myanimelist.net/anime/21/One_Piece",
    tags: ["long-running", "pirates", "adventure", "classic"],
    awards: ["Guinness World Record for most copies published for same comic series"]
  },
  {
    title: "Death Note",
    japaneseTitle: "デスノート",
    romajiTitle: "Desu Nōto",
    englishTitle: "Death Note",
    description: "Genius high school student Light Yagami finds a supernatural notebook that allows him to kill anyone whose name he writes in it.",
    synopsis: "A genius student gains the power to kill anyone by writing their name in a supernatural notebook.",
    episodes: 37,
    episodeDuration: 23,
    status: "completed",
    startDate: "2006-10-04",
    endDate: "2007-06-27",
    averageRating: 9.4,
    popularity: 2400000,
    favorites: 980000,
    rank: 15,
    genres: ["mystery", "psychological", "supernatural", "thriller"],
    themes: ["justice", "morality", "intelligence", "power", "cat and mouse"],
    demographic: "shounen",
    ageRating: "R",
    source: "manga",
    studio: "Madhouse",
    producer: ["VAP", "Nippon Television", "Shueisha"],
    myanimelistUrl: "https://myanimelist.net/anime/1535/Death_Note",
    tags: ["psychological thriller", "mind games", "classic"],
    awards: ["Anime Grand Prix Award", "Seiun Award for Best Manga"]
  },
  {
    title: "Fullmetal Alchemist: Brotherhood",
    japaneseTitle: "鋼の錬金術師 FULLMETAL ALCHEMIST",
    romajiTitle: "Hagane no Renkinjutsushi: Fullmetal Alchemist",
    englishTitle: "Fullmetal Alchemist: Brotherhood",
    description: "Brothers Edward and Alphonse Elric use alchemy in their quest to restore their bodies after a failed transmutation.",
    synopsis: "Two brothers use alchemy to try to bring their mother back to life, but the attempt fails and they lose their bodies.",
    episodes: 64,
    episodeDuration: 24,
    status: "completed",
    startDate: "2009-04-05",
    endDate: "2010-07-04",
    averageRating: 9.8,
    popularity: 1900000,
    favorites: 850000,
    rank: 1,
    genres: ["action", "adventure", "drama", "fantasy"],
    themes: ["alchemy", "brotherhood", "sacrifice", "war", "humanity"],
    demographic: "shounen",
    ageRating: "R",
    source: "manga",
    studio: "Bones",
    producer: ["Aniplex", "Square Enix", "Mainichi Broadcasting System"],
    myanimelistUrl: "https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood",
    tags: ["masterpiece", "alchemy", "brotherhood", "top-rated"],
    awards: ["Anime of the Year 2010", "Best Manga Adaptation"]
  },
  {
    title: "Demon Slayer",
    japaneseTitle: "鬼滅の刃",
    romajiTitle: "Kimetsu no Yaiba",
    englishTitle: "Demon Slayer",
    description: "Tanjiro Kamado's family is slaughtered by demons, and his sister Nezuko is turned into a demon.",
    synopsis: "After his family is killed by demons, Tanjiro Kamado becomes a demon slayer to find a cure for his sister.",
    episodes: 55,
    episodeDuration: 24,
    status: "ongoing",
    startDate: "2019-04-06",
    averageRating: 9.1,
    popularity: 1800000,
    favorites: 750000,
    rank: 8,
    genres: ["action", "fantasy", "historical", "horror", "shounen"],
    themes: ["demons", "family", "revenge", "sword fighting", "determination"],
    demographic: "shounen",
    ageRating: "R",
    source: "manga",
    studio: "ufotable",
    producer: ["Aniplex", "Shueisha"],
    myanimelistUrl: "https://myanimelist.net/anime/38000/Kimetsu_no_Yaiba",
    tags: ["demons", "sword fighting", "emotional", "beautiful animation"],
    awards: ["Anime of the Year 2019", "Best Animation", "Crunchyroll Anime Awards"]
  },
  {
    title: "Jujutsu Kaisen",
    japaneseTitle: "呪術廻戦",
    romajiTitle: "Jujutsu Kaisen",
    englishTitle: "Jujutsu Kaisen",
    description: "High school student Yuji Itadori swallows a cursed object and becomes host to Ryomen Sukuna, the King of Curses.",
    synopsis: "A high school student swallows a cursed finger and becomes the host of the most powerful curse.",
    episodes: 47,
    episodeDuration: 23,
    status: "ongoing",
    startDate: "2020-10-03",
    averageRating: 9.2,
    popularity: 1600000,
    favorites: 680000,
    rank: 10,
    genres: ["action", "fantasy", "horror", "shounen", "supernatural"],
    themes: ["curses", "sorcery", "dark fantasy", "martial arts", "friendship"],
    demographic: "shounen",
    ageRating: "R",
    source: "manga",
    studio: "MAPPA",
    producer: ["TOHO animation", "Shueisha", "Sumzap"],
    myanimelistUrl: "https://myanimelist.net/anime/40748/Jujutsu_Kaisen",
    tags: ["dark fantasy", "curses", "action-packed", "modern"],
    awards: ["Anime of the Year 2021", "Best Fight Scene"]
  }
];

// Insert Anime and store their IDs
const insertedAnimes = await Anime.insertMany(animeDocuments);
console.log(`✅ Inserted ${insertedAnimes.length} anime`);

// Create a map for easy reference
const animeMap = new Map();
insertedAnimes.forEach(anime => {
  animeMap.set(anime.title, anime._id);
});

// ==================== SEASONS DATA ====================
const seasonsData = [
  // Naruto Shippuden Seasons
  { animeId: animeMap.get("Naruto Shippuden"), seasonNumber: 1, title: "The Kazekage Rescue", episodes: 32, startDate: "2007-02-15", endDate: "2007-08-30", rating: 8.5, synopsis: "Naruto and Sakura try to rescue Gaara from the Akatsuki." },
  { animeId: animeMap.get("Naruto Shippuden"), seasonNumber: 2, title: "The Sasuke and Sai Arc", episodes: 31, startDate: "2007-09-06", endDate: "2008-03-27", rating: 8.7, synopsis: "Naruto meets Sai and pursues Sasuke." },
  { animeId: animeMap.get("Naruto Shippuden"), seasonNumber: 3, title: "Hidan and Kakuzu Arc", episodes: 35, startDate: "2008-04-03", endDate: "2008-11-27", rating: 8.9, synopsis: "Shikamaru avenges Asuma's death." },
  
  // Attack on Titan Seasons
  { animeId: animeMap.get("Attack on Titan"), seasonNumber: 1, title: "Attack on Titan", episodes: 25, startDate: "2013-04-07", endDate: "2013-09-29", rating: 9.3, synopsis: "The Colossal Titan breaches Wall Maria." },
  { animeId: animeMap.get("Attack on Titan"), seasonNumber: 2, title: "Attack on Titan Season 2", episodes: 12, startDate: "2017-04-01", endDate: "2017-06-17", rating: 9.4, synopsis: "The true nature of Titans is revealed." },
  { animeId: animeMap.get("Attack on Titan"), seasonNumber: 3, title: "Attack on Titan Season 3", episodes: 22, startDate: "2018-07-23", endDate: "2019-07-01", rating: 9.6, synopsis: "The coup against the royal government." },
  { animeId: animeMap.get("Attack on Titan"), seasonNumber: 4, title: "Attack on Titan Final Season", episodes: 30, startDate: "2020-12-07", endDate: "2023-11-05", rating: 9.8, synopsis: "The final war for humanity's survival." },
  
  // Demon Slayer Seasons
  { animeId: animeMap.get("Demon Slayer"), seasonNumber: 1, title: "Unwavering Resolve Arc", episodes: 26, startDate: "2019-04-06", endDate: "2019-09-28", rating: 8.9, synopsis: "Tanjiro becomes a demon slayer." },
  { animeId: animeMap.get("Demon Slayer"), seasonNumber: 2, title: "Entertainment District Arc", episodes: 11, startDate: "2021-12-05", endDate: "2022-02-13", rating: 9.1, synopsis: "Tanjiro fights demons in the entertainment district." },
  { animeId: animeMap.get("Demon Slayer"), seasonNumber: 3, title: "Swordsmith Village Arc", episodes: 11, startDate: "2023-04-09", endDate: "2023-06-18", rating: 9.0, synopsis: "Tanjiro visits the swordsmith village." }
];

if (seasonsData.length) {
  await Season.insertMany(seasonsData);
  console.log(`✅ Inserted ${seasonsData.length} seasons`);
}

// ==================== RATINGS DATA ====================
const ratingsData = [
  // Naruto Ratings
  { animeId: animeMap.get("Naruto"), site: "myanimelist", score: 8.5, votes: 1500000, url: "https://myanimelist.net/anime/20/Naruto" },
  { animeId: animeMap.get("Naruto"), site: "imdb", score: 8.3, votes: 180000, url: "https://www.imdb.com/title/tt0409591/" },
  { animeId: animeMap.get("Naruto"), site: "anilist", score: 8.4, votes: 850000, url: "https://anilist.co/anime/20/Naruto" },
  
  // Naruto Shippuden Ratings
  { animeId: animeMap.get("Naruto Shippuden"), site: "myanimelist", score: 8.7, votes: 1300000, url: "https://myanimelist.net/anime/1735/Naruto__Shippuuden" },
  { animeId: animeMap.get("Naruto Shippuden"), site: "imdb", score: 8.6, votes: 150000, url: "https://www.imdb.com/title/tt0988824/" },
  
  // Attack on Titan Ratings
  { animeId: animeMap.get("Attack on Titan"), site: "myanimelist", score: 9.5, votes: 2100000, url: "https://myanimelist.net/anime/16498/Shingeki_no_Kyojin" },
  { animeId: animeMap.get("Attack on Titan"), site: "imdb", score: 9.1, votes: 550000, url: "https://www.imdb.com/title/tt2560140/" },
  { animeId: animeMap.get("Attack on Titan"), site: "anilist", score: 9.4, votes: 1200000, url: "https://anilist.co/anime/16498/Attack-on-Titan" },
  { animeId: animeMap.get("Attack on Titan"), site: "kitsu", score: 9.3, votes: 450000, url: "https://kitsu.io/anime/attack-on-titan" },
  
  // One Piece Ratings
  { animeId: animeMap.get("One Piece"), site: "myanimelist", score: 9.2, votes: 2800000, url: "https://myanimelist.net/anime/21/One_Piece" },
  { animeId: animeMap.get("One Piece"), site: "imdb", score: 9.0, votes: 180000, url: "https://www.imdb.com/title/tt0388629/" },
  { animeId: animeMap.get("One Piece"), site: "anilist", score: 9.1, votes: 1500000, url: "https://anilist.co/anime/21/One-Piece" },
  
  // Death Note Ratings
  { animeId: animeMap.get("Death Note"), site: "myanimelist", score: 9.0, votes: 2400000, url: "https://myanimelist.net/anime/1535/Death_Note" },
  { animeId: animeMap.get("Death Note"), site: "imdb", score: 9.0, votes: 450000, url: "https://www.imdb.com/title/tt0877057/" },
  { animeId: animeMap.get("Death Note"), site: "anilist", score: 8.9, votes: 1300000, url: "https://anilist.co/anime/1535/Death-Note" },
  
  // Fullmetal Alchemist Brotherhood Ratings
  { animeId: animeMap.get("Fullmetal Alchemist: Brotherhood"), site: "myanimelist", score: 9.8, votes: 1900000, url: "https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood" },
  { animeId: animeMap.get("Fullmetal Alchemist: Brotherhood"), site: "imdb", score: 9.1, votes: 220000, url: "https://www.imdb.com/title/tt1355642/" },
  { animeId: animeMap.get("Fullmetal Alchemist: Brotherhood"), site: "anilist", score: 9.5, votes: 1100000, url: "https://anilist.co/anime/5114/Fullmetal-Alchemist-Brotherhood" },
  
  // Demon Slayer Ratings
  { animeId: animeMap.get("Demon Slayer"), site: "myanimelist", score: 8.9, votes: 1800000, url: "https://myanimelist.net/anime/38000/Kimetsu_no_Yaiba" },
  { animeId: animeMap.get("Demon Slayer"), site: "imdb", score: 8.7, votes: 150000, url: "https://www.imdb.com/title/tt9335498/" },
  { animeId: animeMap.get("Demon Slayer"), site: "anilist", score: 8.8, votes: 950000, url: "https://anilist.co/anime/38000/Demon-Slayer" },
  
  // Jujutsu Kaisen Ratings
  { animeId: animeMap.get("Jujutsu Kaisen"), site: "myanimelist", score: 8.9, votes: 1600000, url: "https://myanimelist.net/anime/40748/Jujutsu_Kaisen" },
  { animeId: animeMap.get("Jujutsu Kaisen"), site: "imdb", score: 8.6, votes: 120000, url: "https://www.imdb.com/title/tt12343534/" },
  { animeId: animeMap.get("Jujutsu Kaisen"), site: "anilist", score: 8.8, votes: 850000, url: "https://anilist.co/anime/40748/Jujutsu-Kaisen" }
];

await Rating.insertMany(ratingsData);
console.log(`✅ Inserted ${ratingsData.length} ratings`);

// ==================== CHARACTERS DATA ====================
const charactersData = [
  // Naruto Characters
  { animeId: animeMap.get("Naruto"), name: "Naruto Uzumaki", japaneseName: "うずまきナルト", role: "main", voiceActor: "Junko Takeuchi", japaneseVoiceActor: "Junko Takeuchi", description: "The protagonist who dreams of becoming Hokage" },
  { animeId: animeMap.get("Naruto"), name: "Sasuke Uchiha", japaneseName: "うちはサスケ", role: "main", voiceActor: "Noriaki Sugiyama", japaneseVoiceActor: "Noriaki Sugiyama", description: "Naruto's rival and last surviving Uchiha" },
  { animeId: animeMap.get("Naruto"), name: "Sakura Haruno", japaneseName: "春野サクラ", role: "main", voiceActor: "Chie Nakamura", japaneseVoiceActor: "Chie Nakamura", description: "A kunoichi with incredible strength" },
  { animeId: animeMap.get("Naruto"), name: "Kakashi Hatake", japaneseName: "はたけカカシ", role: "supporting", voiceActor: "Kazuhiko Inoue", japaneseVoiceActor: "Kazuhiko Inoue", description: "Leader of Team 7" },
  
  // Attack on Titan Characters
  { animeId: animeMap.get("Attack on Titan"), name: "Eren Yeager", japaneseName: "エレン・イェーガー", role: "main", voiceActor: "Yuki Kaji", japaneseVoiceActor: "Yuki Kaji", description: "The protagonist who seeks revenge against the Titans" },
  { animeId: animeMap.get("Attack on Titan"), name: "Mikasa Ackerman", japaneseName: "ミカサ・アッカーマン", role: "main", voiceActor: "Yui Ishikawa", japaneseVoiceActor: "Yui Ishikawa", description: "Eren's adoptive sister and a skilled soldier" },
  { animeId: animeMap.get("Attack on Titan"), name: "Armin Arlert", japaneseName: "アルミン・アルレルト", role: "main", voiceActor: "Marina Inoue", japaneseVoiceActor: "Marina Inoue", description: "Eren's strategic-minded best friend" },
  { animeId: animeMap.get("Attack on Titan"), name: "Levi Ackerman", japaneseName: "リヴァイ・アッカーマン", role: "supporting", voiceActor: "Hiroshi Kamiya", japaneseVoiceActor: "Hiroshi Kamiya", description: "Humanity's strongest soldier" },
  
  // One Piece Characters
  { animeId: animeMap.get("One Piece"), name: "Monkey D. Luffy", japaneseName: "モンキー・D・ルフィ", role: "main", voiceActor: "Mayumi Tanaka", japaneseVoiceActor: "Mayumi Tanaka", description: "The captain of the Straw Hat Pirates" },
  { animeId: animeMap.get("One Piece"), name: "Roronoa Zoro", japaneseName: "ロロノア・ゾロ", role: "main", voiceActor: "Kazuya Nakai", japaneseVoiceActor: "Kazuya Nakai", description: "The crew's swordsman" },
  { animeId: animeMap.get("One Piece"), name: "Nami", japaneseName: "ナミ", role: "main", voiceActor: "Akemi Okamura", japaneseVoiceActor: "Akemi Okamura", description: "The crew's navigator" },
  
  // Death Note Characters
  { animeId: animeMap.get("Death Note"), name: "Light Yagami", japaneseName: "夜神月", role: "main", voiceActor: "Mamoru Miyano", japaneseVoiceActor: "Mamoru Miyano", description: "The protagonist who becomes Kira" },
  { animeId: animeMap.get("Death Note"), name: "L", japaneseName: "エル", role: "main", voiceActor: "Kappei Yamaguchi", japaneseVoiceActor: "Kappei Yamaguchi", description: "The world's greatest detective" },
  { animeId: animeMap.get("Death Note"), name: "Misa Amane", japaneseName: "弥海砂", role: "supporting", voiceActor: "Aya Hirano", japaneseVoiceActor: "Aya Hirano", description: "The second Kira" },
  
  // Fullmetal Alchemist Characters
  { animeId: animeMap.get("Fullmetal Alchemist: Brotherhood"), name: "Edward Elric", japaneseName: "エドワード・エルリック", role: "main", voiceActor: "Romi Park", japaneseVoiceActor: "Romi Park", description: "The Fullmetal Alchemist" },
  { animeId: animeMap.get("Fullmetal Alchemist: Brotherhood"), name: "Alphonse Elric", japaneseName: "アルフォンス・エルリック", role: "main", voiceActor: "Rie Kugimiya", japaneseVoiceActor: "Rie Kugimiya", description: "Edward's younger brother" },
  
  // Demon Slayer Characters
  { animeId: animeMap.get("Demon Slayer"), name: "Tanjiro Kamado", japaneseName: "竈門炭治郎", role: "main", voiceActor: "Natsuki Hanae", japaneseVoiceActor: "Natsuki Hanae", description: "The protagonist who becomes a demon slayer" },
  { animeId: animeMap.get("Demon Slayer"), name: "Nezuko Kamado", japaneseName: "竈門禰豆子", role: "main", voiceActor: "Akari Kito", japaneseVoiceActor: "Akari Kito", description: "Tanjiro's demon sister" },
  { animeId: animeMap.get("Demon Slayer"), name: "Zenitsu Agatsuma", japaneseName: "我妻善逸", role: "main", voiceActor: "Hiro Shimono", japaneseVoiceActor: "Hiro Shimono", description: "A cowardly but powerful demon slayer" },
  
  // Jujutsu Kaisen Characters
  { animeId: animeMap.get("Jujutsu Kaisen"), name: "Yuji Itadori", japaneseName: "虎杖悠仁", role: "main", voiceActor: "Junya Enoki", japaneseVoiceActor: "Junya Enoki", description: "The protagonist who hosts Sukuna" },
  { animeId: animeMap.get("Jujutsu Kaisen"), name: "Megumi Fushiguro", japaneseName: "伏黒恵", role: "main", voiceActor: "Yuma Uchida", japaneseVoiceActor: "Yuma Uchida", description: "A jujutsu sorcerer" },
  { animeId: animeMap.get("Jujutsu Kaisen"), name: "Nobara Kugisaki", japaneseName: "釘崎野薔薇", role: "main", voiceActor: "Asami Seto", japaneseVoiceActor: "Asami Seto", description: "A jujutsu sorcerer" }
];

await Character.insertMany(charactersData);
console.log(`✅ Inserted ${charactersData.length} characters`);

// ==================== STAFF DATA ====================
const staffData = [
  // Naruto Staff
  { animeId: animeMap.get("Naruto"), name: "Masashi Kishimoto", japaneseName: "岸本斉史", role: "writer", contribution: "Original Creator" },
  { animeId: animeMap.get("Naruto"), name: "Hayato Date", japaneseName: "伊達勇登", role: "director", contribution: "Series Director" },
  
  // Attack on Titan Staff
  { animeId: animeMap.get("Attack on Titan"), name: "Hajime Isayama", japaneseName: "諫山創", role: "writer", contribution: "Original Creator" },
  { animeId: animeMap.get("Attack on Titan"), name: "Tetsuro Araki", japaneseName: "荒木哲郎", role: "director", contribution: "Director (Seasons 1-3)" },
  { animeId: animeMap.get("Attack on Titan"), name: "Yuichiro Hayashi", japaneseName: "林祐一郎", role: "director", contribution: "Director (Final Season)" },
  { animeId: animeMap.get("Attack on Titan"), name: "Hiroyuki Sawano", japaneseName: "澤野弘之", role: "music", contribution: "Composer" },
  
  // One Piece Staff
  { animeId: animeMap.get("One Piece"), name: "Eiichiro Oda", japaneseName: "尾田栄一郎", role: "writer", contribution: "Original Creator" },
  { animeId: animeMap.get("One Piece"), name: "Kōnosuke Uda", japaneseName: "宇田鋼之介", role: "director", contribution: "Director (1999-2006)" },
  
  // Death Note Staff
  { animeId: animeMap.get("Death Note"), name: "Tsugumi Ohba", japaneseName: "大場つぐみ", role: "writer", contribution: "Original Creator" },
  { animeId: animeMap.get("Death Note"), name: "Takeshi Obata", japaneseName: "小畑健", role: "character_design", contribution: "Artist" },
  { animeId: animeMap.get("Death Note"), name: "Tetsuro Araki", japaneseName: "荒木哲郎", role: "director", contribution: "Director" },
  
  // Fullmetal Alchemist Staff
  { animeId: animeMap.get("Fullmetal Alchemist: Brotherhood"), name: "Hiromu Arakawa", japaneseName: "荒川弘", role: "writer", contribution: "Original Creator" },
  { animeId: animeMap.get("Fullmetal Alchemist: Brotherhood"), name: "Yasuhiro Irie", japaneseName: "入江泰浩", role: "director", contribution: "Director" },
  
  // Demon Slayer Staff
  { animeId: animeMap.get("Demon Slayer"), name: "Koyoharu Gotouge", japaneseName: "吾峠呼世晴", role: "writer", contribution: "Original Creator" },
  { animeId: animeMap.get("Demon Slayer"), name: "Haruo Sotozaki", japaneseName: "外崎春雄", role: "director", contribution: "Director" },
  
  // Jujutsu Kaisen Staff
  { animeId: animeMap.get("Jujutsu Kaisen"), name: "Gege Akutami", japaneseName: "芥見下々", role: "writer", contribution: "Original Creator" },
  { animeId: animeMap.get("Jujutsu Kaisen"), name: "Sunghoo Park", role: "director", contribution: "Director (Season 1)" }
];

await Staff.insertMany(staffData);
console.log(`✅ Inserted ${staffData.length} staff members`);

// ==================== THEMES DATA (Openings & Endings) ====================
const themesData = [
  // Naruto Themes
  { animeId: animeMap.get("Naruto"), type: "opening", title: "R★O★C★K★S", artist: "Hound Dog", episodes: "1-25" },
  { animeId: animeMap.get("Naruto"), type: "opening", title: "Haruka Kanata", artist: "Asian Kung-Fu Generation", episodes: "26-53" },
  { animeId: animeMap.get("Naruto"), type: "ending", title: "Wind", artist: "Akeboshi", episodes: "1-25" },
  { animeId: animeMap.get("Naruto"), type: "ending", title: "Harmonia", artist: "Rythem", episodes: "26-51" },
  
  // Naruto Shippuden Themes
  { animeId: animeMap.get("Naruto Shippuden"), type: "opening", title: "Hero's Come Back!!", artist: "Nobodyknows+", episodes: "1-30" },
  { animeId: animeMap.get("Naruto Shippuden"), type: "opening", title: "Distance", artist: "Long Shot Party", episodes: "31-53" },
  { animeId: animeMap.get("Naruto Shippuden"), type: "opening", title: "Blue Bird", artist: "Ikimono-gakari", episodes: "54-77" },
  
  // Attack on Titan Themes
  { animeId: animeMap.get("Attack on Titan"), type: "opening", title: "Guren no Yumiya", artist: "Linked Horizon", episodes: "1-13", youtubeUrl: "https://youtube.com/watch?v=example1" },
  { animeId: animeMap.get("Attack on Titan"), type: "opening", title: "Jiyuu no Tsubasa", artist: "Linked Horizon", episodes: "14-25", youtubeUrl: "https://youtube.com/watch?v=example2" },
  { animeId: animeMap.get("Attack on Titan"), type: "opening", title: "Shoukei to Shikabane no Michi", artist: "Linked Horizon", episodes: "26-37" },
  { animeId: animeMap.get("Attack on Titan"), type: "opening", title: "Red Swan", artist: "Yoshiki feat. Hyde", episodes: "38-49" },
  { animeId: animeMap.get("Attack on Titan"), type: "opening", title: "My War", artist: "Shinsei Kamattechan", episodes: "60-75" },
  { animeId: animeMap.get("Attack on Titan"), type: "opening", title: "The Rumbling", artist: "SiM", episodes: "76-89" },
  { animeId: animeMap.get("Attack on Titan"), type: "ending", title: "Utsukushiki Zankoku na Sekai", artist: "Yoko Hikasa", episodes: "1-13" },
  { animeId: animeMap.get("Attack on Titan"), type: "ending", title: "Great Escape", artist: "Cinema Staff", episodes: "14-25" },
  { animeId: animeMap.get("Attack on Titan"), type: "ending", title: "Akatsuki no Requiem", artist: "Linked Horizon", episodes: "26-37" },
  
  // One Piece Themes
  { animeId: animeMap.get("One Piece"), type: "opening", title: "We Are!", artist: "Hiroshi Kitadani", episodes: "1-47" },
  { animeId: animeMap.get("One Piece"), type: "opening", title: "Believe", artist: "Folder5", episodes: "48-115" },
  { animeId: animeMap.get("One Piece"), type: "opening", title: "Hikari E", artist: "The Babystars", episodes: "116-168" },
  
  // Death Note Themes
  { animeId: animeMap.get("Death Note"), type: "opening", title: "The World", artist: "Nightmare", episodes: "1-19" },
  { animeId: animeMap.get("Death Note"), type: "opening", title: "What's Up, People?!", artist: "Maximum the Hormone", episodes: "20-37" },
  { animeId: animeMap.get("Death Note"), type: "ending", title: "Alumina", artist: "Nightmare", episodes: "1-19" },
  { animeId: animeMap.get("Death Note"), type: "ending", title: "Zetsubou Billy", artist: "Maximum the Hormone", episodes: "20-36" },
  
  // Fullmetal Alchemist Brotherhood Themes
  { animeId: animeMap.get("Fullmetal Alchemist: Brotherhood"), type: "opening", title: "Again", artist: "Yui", episodes: "1-14" },
  { animeId: animeMap.get("Fullmetal Alchemist: Brotherhood"), type: "opening", title: "Hologram", artist: "Nico Touches the Walls", episodes: "15-26" },
  { animeId: animeMap.get("Fullmetal Alchemist: Brotherhood"), type: "opening", title: "Golden Time Lover", artist: "Sukima Switch", episodes: "27-38" },
  
  // Demon Slayer Themes
  { animeId: animeMap.get("Demon Slayer"), type: "opening", title: "Gurenge", artist: "LiSA", episodes: "1-26" },
  { animeId: animeMap.get("Demon Slayer"), type: "opening", title: "Zankyosanka", artist: "Aimer", episodes: "27-37" },
  
  // Jujutsu Kaisen Themes
  { animeId: animeMap.get("Jujutsu Kaisen"), type: "opening", title: "Kaikai Kitan", artist: "Eve", episodes: "1-13" },
  { animeId: animeMap.get("Jujutsu Kaisen"), type: "opening", title: "Vivid Vice", artist: "Who-ya Extended", episodes: "14-24" }
];

await Theme.insertMany(themesData);
console.log(`✅ Inserted ${themesData.length} themes`);

// ==================== RELATED ANIME DATA ====================
const relatedAnimeData = [
  { animeId: animeMap.get("Naruto Shippuden"), relatedAnimeId: animeMap.get("Naruto"), relationType: "sequel" },
  { animeId: animeMap.get("Naruto"), relatedAnimeId: animeMap.get("Naruto Shippuden"), relationType: "prequel" }
];

if (relatedAnimeData.length) {
  await RelatedAnime.insertMany(relatedAnimeData);
  console.log(`✅ Inserted ${relatedAnimeData.length} related anime relationships`);
}

// ==================== SUMMARY ====================
console.log("\n" + "=".repeat(60));
console.log("🌱 SEEDING COMPLETED SUCCESSFULLY!");
console.log("=".repeat(60));
console.log(`\n📊 Database Statistics:`);
console.log(`   • Anime: ${await Anime.countDocuments()}`);
console.log(`   • Seasons: ${await Season.countDocuments()}`);
console.log(`   • Ratings: ${await Rating.countDocuments()}`);
console.log(`   • Characters: ${await Character.countDocuments()}`);
console.log(`   • Staff: ${await Staff.countDocuments()}`);
console.log(`   • Themes: ${await Theme.countDocuments()}`);
console.log(`   • Related Anime: ${await RelatedAnime.countDocuments()}`);
console.log("\n✨ All data has been properly referenced using _id fields!\n");

process.exit();