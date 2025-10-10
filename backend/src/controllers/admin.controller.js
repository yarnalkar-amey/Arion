import Song from "../models/song.model.js";
import Album from "../models/album.model.js";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });

    return result.secure_url;
  } catch (error) {
    console.log("Error uploading reasource to the cloudinary: " + error);
    throw new Error("Error Uploading to cloudinary");
  }
};

export const postCreateSongController = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res
        .status(400)
        .json({ message: "Please upload the required files." });
    }

    const { title, artist, albumId, duration } = req.body;

    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const newSong = new Song({
      title,
      artist,
      duration,
      audioUrl,
      imageUrl,
      albumId: albumId || null,
    });

    await newSong.save();

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: newSong._id },
      });
    }
  } catch (error) {
    console.log("Error Creating New Song: " + error);
    next(error);
  }
};

export const deleteSongController = async (req, res, next) => {
  try {
    const { id: songId } = req.params;

    const currentSong = await Song.findById(songId);

    if (currentSong.albumId) {
      await Album.findByIdAndUpdate(currentSong.albumId, {
        $pull: { songs: currentSong._id },
      });
    }

    await Song.findByIdAndDelete(songId);

    return res.status(200).json({ message: "Song deleted Successfully" });

  } catch (error) {
    console.log("Error in deleting the Song: " + error);
    next(error);
  }
};

export const postAlbumCreation = async(req,res,next) => {
    try {

        const {title, artist, releaseYear} = req.body;

        if(!title || !artist || !releaseYear) {
          return res.status(400).json({message:"Please fill the required feilds."});
        }

        const imageFile = req.files;

        if(!imageFile){
          return res.status(400).json({message:"Please upload the image"});
        }

        const imageUrl = await uploadToCloudinary(imageFile);

        const newAlbum = new Album({
          title,
          artist,
          releaseYear,
          imageUrl
        })

        await newAlbum.save();

        return res.status(200).json(newAlbum);
        
    } catch (error) {
        console.log("Error Creating new Album: " + error);
        next(error);
    }
}

export const deleteAlbumController = async (req,res,next) => {

  try {
    
    //get the id
    const {id} = req.params;

    if(!id){
      return res.status(409).json("Try again letter");
    }

    await Song.deleteMany({albumId:id});
    await Album.findByIdAndDelete(id);

    res.status(200).json({message:"Album deleted Successfully"});
  } catch (error) {
    console.log("Error Deleting the Album: " + error);
    next(error);
  }
}

export const checkAdmin = async(req,res,next) => {
  res.status(200).json({admin:true})
}