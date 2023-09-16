import { createStudent, getStudent } from './StudentAPI';
import { createSupervisor, getSupervisor } from './SupervisorAPI';
import { createTeam, getTeam } from './TeamAPI';

const express = require('express');

const defRouter = express.Router()
const studentRouter = express.Router()
const supervisorRouter = express.Router()
const teamRouter = express.Router()

// Default

defRouter.get("/", (req, res) => {
    res.status(200).json({ ok:"true" })
})

// Student API
studentRouter.get("/getStudent/:sid", getStudent)
studentRouter.post("/createStudent", createStudent)

// Student API
supervisorRouter.get("/getSupervisor/:sid", getSupervisor)
supervisorRouter.post("/createSupervisor", createSupervisor)

// Team API
teamRouter.get("/getTeam/:id", getTeam)
teamRouter.post("/createTeam", createTeam)

export { defRouter, studentRouter, teamRouter, supervisorRouter }


