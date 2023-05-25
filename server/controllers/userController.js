import User from "../model/User.js";
import bcrypt from "bcryptjs";

// htttp request are always asyn request

// getallUser controller
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log("Error occured ->", err);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
};

//signup controller
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let exisitingUser;
  try {
    exisitingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  // if existing user is already in database
  if (exisitingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login Instead" });
  }
  // if not present then new user created
  const hashedPassword = bcrypt.hashSync(password); //   hashing the password
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
};



// login controller

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Couldn't find user by this email 😆" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (isPasswordCorrect === false) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  return res.status(200).json({ message: "Login sucessfully 👍" });
};
