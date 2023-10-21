import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import User from "../models/user-model.js";
export const login = (req, res) => {
  try {
    res.json({
      status: 200,
      message: "Success to get all users",
      data: [],
      total_user: [],
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const signUp = async (req, res, next) => {
  const { username, password,age, email } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password,10)
    const user = await User.create({
      username,
      age,
      email,
      password: hashedPassword
    })
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
    console.log(err)
  }
};
