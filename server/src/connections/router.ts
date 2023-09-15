import { createStudent, getStudent } from './StudentAPI';

const express = require('express');

const defRouter = express.Router()
const studentRouter = express.Router()

// Default

defRouter.get("/", (req, res) => {
    res.status(200).json({ ok:"true" })
})

// Student API
studentRouter.get("/getStudent/:sid", getStudent)
studentRouter.post("/createStudent", createStudent)

export { defRouter, studentRouter }


