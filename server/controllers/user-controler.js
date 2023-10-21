import User from "../models/user-model.js";
import { Op } from "sequelize";
export const getAllUsers = async (req, res) => {
  try {
    const { name } = req.query;
    const whereCondition = name ? { username: { [Op.like]: `%${name}%` } } : {};
    const user = await User.findAll({ where: whereCondition })

    res.json({
      status: 200,
      message: "Success to get all users",
      data: user,
      total_user: [],
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
