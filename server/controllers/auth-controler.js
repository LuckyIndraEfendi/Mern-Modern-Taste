import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return next(errorHandler(404, "User not found!"));
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return next(errorHandler(401, "Invalid Credentials!"));
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRETKEY, {
      expiresIn: 3600,
    });
    const {password : pass, ...rest } = user.dataValues
    res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      message2 : err.message
    });
  }
};

export const signUp = async (req, res, next) => {
  const { username, password, age, email } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      username,
      age,
      email,
      password: hashedPassword,
    });
    if (!user) {
      return res.status(400).send({
        statusCode: 400,
        message: "Bad Request",
      });
    }
    res.status(201).send({
      statusCode: 201,
      message: "User successfully created",
      user,
    });
  } catch (err) {
    next(errorHandler(500, "Couldn't create user"));
    console.log(err);
  }
};
