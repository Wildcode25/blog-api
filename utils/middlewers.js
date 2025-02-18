import { SECRET } from "../config/dotenvConfig.js";
import jwt from "jsonwebtoken";
export const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

export const userExtractor = (req, res, next) => {
  if (!req.token) return res.status(401).json();
  try {
    req.session = { user: null };
    req.session.user = jwt.verify(req.token, process.env.SECRET);
  } catch (error) {
    next(error);
  }
  next();
};
export const errorHandler = async (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response
      .status(400)
      .send({ message: { content: error.message, isError: true } });
  } else if (error.name === "ValidationError") {
    return response
      .status(400)
      .json({ message: { content: error.message, isError: true } });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ message: { content: error.message, isError: true } });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      message: { content: error.message, isError: true },
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      message: { content: error.message, isError: true },
    });
  }

  next(error);
};
