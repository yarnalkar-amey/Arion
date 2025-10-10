import Song from "../models/song.model.js";

export const getSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({createdAt: -1});
    return res.status(200).json(songs);
  } catch (error) {
    console.log("Error Fecthing Songs: " + error);
    next(error);
  }
};

export const getFeaturedSongs = async (req,res,next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample:6
            },{
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])

        res.status(200).json(songs);
    } catch (error) {
        console.log("Error Fecthing Featured Songs: " + error);
        next(error);
    }
}

export const getMadeForYouSongs = async (req,res,next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample:4
            },{
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])

        res.status(200).json(songs);
    } catch (error) {
        console.log("Error Fecthing Featured Songs: " + error);
        next(error);
    }
}

export const getTrendingSongs = async (req,res,next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample:4
            },{
                $project:{
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])

        res.status(200).json(songs);
    } catch (error) {
        console.log("Error Fecthing Featured Songs: " + error);
        next(error);
    }
}