import express from 'express';
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import CourseRoutes from "./courses/routes.js";
import "dotenv/config";
import session from "express-session";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);
// const express = require('express')
const app = express()
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));


app.use(express.json());
UserRoutes(app);

ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app)
app.listen(process.env.PORT || 4000)

