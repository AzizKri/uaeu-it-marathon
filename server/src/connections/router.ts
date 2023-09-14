import { addUser, getUsers } from './UserAPI';

const express = require('express');

const defRouter = express.Router()
const userRouter = express.Router()

// Default

defRouter.get("/", (req, res) => {
    res.status(200).json({ ok:"true" })
})

// Users API
userRouter.get("/getUsers", getUsers)
userRouter.post("/addUser", addUser)

export { defRouter, userRouter }


