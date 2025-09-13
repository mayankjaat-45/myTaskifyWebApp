import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { it } from "node:test";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Fields are Required" });
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }
    //checking user Exist or Not
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.status(201).json({
      message: "User Register Successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error in Register Controller" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are Required" });
    }

    //checking the user Exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //checking password is correct or not
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) res.status(400).json({ message: "Invalid Credentials" });

    //generate token
    const token = generateToken(user._id);

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.status(200).json({
      message: "User Login Successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error in LoggedIn " });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // set expiration in past
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "logged Out Successfully" });
};

export const userDetails = async (req, res) => {
  try {
    // req.user is already the user object set by middleware
    const getDetails = await User.findById(req.user._id)
      .populate("tasks")
      .select("-password");

    if (!getDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    const allTask = getDetails.tasks || [];
    const YetToStart = [];
    const InProgress = [];
    const Completed = [];

    allTask.forEach((item) => {
      if (item.status === "YetToStart") {
        YetToStart.push(item);
      } else if (item.status === "InProgress") {
        InProgress.push(item);
      } else if (item.status === "Completed") {
        // ✅ match status naming
        Completed.push(item);
      }
    });

    return res.status(200).json({
      success: true,
      tasks: { YetToStart, InProgress, Completed },
    });
  } catch (error) {
    console.error("Error in userDetails:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
