import User from "../models/user.model.js";

export const authCallbackController = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // Check if user already exists
    let user = await User.findOne({ clerkId: id });

    if (!user) {
      user = await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }

    res.status(200).json({
      success: true,
    });

  } catch (error) {
    console.log("Error in the auth callback:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
