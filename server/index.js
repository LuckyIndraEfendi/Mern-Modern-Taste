
import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user-route.js";
import auth from "./routes/auth-route.js";
import checkDatabaseConnection from "./middleware/database.js";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(checkDatabaseConnection);

app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my Rest API!!",
  });
});

app.use(
  cors({
    origin: process.env.REACT_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", auth);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});
