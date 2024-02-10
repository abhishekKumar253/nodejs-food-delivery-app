import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndsetCookie.js";

// register user
export const registerUser = async (req, res) => {
  try {
    const { fullName, username, email, password, phone, address, answer } =
      req.body;

    // validation
    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !answer
    ) {
      return res.status(402).send({
        success: false,
        message: "All field are required",
      });
    }

    // check user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email Already Registerd please Login",
      });
    }

    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });
    res.status(200).send({
      success: true,
      message: "Successfully Registered",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register user",
      error,
    });
  }
};

// login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "please provide email or password",
      });
    }

    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User Not found",
      });
    }

    // check user password | compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // token
    const token = generateTokenAndSetCookie(user._id, res);

    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login user",
      error,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};
