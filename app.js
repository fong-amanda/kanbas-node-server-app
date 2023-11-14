import express from 'express';
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import "dotenv/config";


/**const express = require('express')*/
const app = express()
app.use(cors({
    credentials: true,

    origin: process.env.FRONTEND_URL
})
);

CourseRoutes(app);
app.use(express.json());
Lab5(app);
Hello(app)
app.listen(process.env.PORT || 4000)

