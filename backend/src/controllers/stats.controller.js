import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import User from "../models/user.model.js";


export const getStats = async (req, res, next) => {
  try {
    // Run everything in parallel for performance
    const [totalAlbums, totalSongs, totalUsers, uniqueArtists] =
      await Promise.all([
        Album.estimatedDocumentCount(), // faster than countDocuments for simple totals
        Song.estimatedDocumentCount(),
        User.estimatedDocumentCount(),
        Song.aggregate([
          {
            $unionWith: {
              coll: "albums", // collection name, not model
              pipeline: [
                { $project: { artist: 1 } }, // pick only artist field
              ],
            },
          },
          {
            $group: { _id: "$artist" },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    // Get unique artist count safely
    const totalArtists = uniqueArtists[0]?.count || 0;

    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      totalArtists,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    next(error);
  }
}