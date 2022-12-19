import jwt from "jsonwebtoken";
import StudentModel from "../models/student.server.model";

import { private_key, public_key } from "./keys.js";

export const verifyToken = async (req, res, next) => {
  const authToken = req.get("Authorization");
  if (!authToken) {
    req.isAuth = false;
    return next();
  }
  const token = authToken.split(" ")[1];
  let verify;
  try {
    verify = jwt.verify(token, public_key);
  } catch (error) {
    req.isAuth = false;
    return next();
  }
  if (!verify._id) {
    req.isAuth = false;
    return next();
  }
  const user = await StudentModel.findById(verify._id);
  if (!user) {
    req.isAuth = false;
    return next();
  }
  req.userId = user._id;
  req.isAuth = true;
  next();
};
