import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// get user profile
export const getUserProfile = async (req, res) => {
  try {
    // find user
    const user = await User.findById(req.user._id);

    // validation
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getUser",
      error,
    });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    // find user
    const user = await User.findById(req.user._id);

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // update
    const { fullName, address, phone } = req.body;
    if (fullName) user.fullName = fullName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updated user",
      error,
    });
  }
};

// // update user password
export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not found",
      });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide old or new password",
      });
    }

    // check user password | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid old password",
      });
    }

    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update user",
      error,
    });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(401).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const user = await User.findOne({ email, answer });
    if (!user) {
      return res.status(402).send({
        success: false,
        message: "User Not found or Invalid answer",
      });
    }

    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in reset Password",
      error,
    });
  }
};

// delete profile account
export const deleteProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete profile",
    });
  }
};
