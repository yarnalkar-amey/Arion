import Album from "../models/album.model.js";

export const getAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();

    return res.status(200).message(albums);
  } catch (error) {
    console.log("Error Fetching Albums: " + error);
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    
    const {albumId} = req.params;

    const album = await Album.findById(albumId).populate("songs");

    if(!requiredAlbum){
        res.status(404).json({message:"Reasource Not Found"});
    }

    res.status(200).json(album);
    
  } catch (error) {
    console.log("Error Fetching Album: " + error);
    next(error);
  }
};
