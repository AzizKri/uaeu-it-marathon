import { studentRouter, defRouter } from "./connections/router"
import { AppDataSource } from "./data-source"
import * as express from "express"
import * as cors from "cors"
var bodyParser = require('body-parser')

const secret = process.env.AUTH_SECRET;

AppDataSource.initialize().then(async () => {
    console.log("Initializing...")
    
    const app = express()
    app.use(express.json())
    app.use(bodyParser.json())
    app.use(cors())
    app.use(function(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: 'Unauthorized.' });
        } else if (req.headers.authorization !== secret) {
            return res.status(403).json({ error: 'Unauthorized.' });
        }
        next();
    })
    app.use("", defRouter)
    app.use("/students", studentRouter)

    // start express server
    app.listen(3000)
    console.log("Initialized. Listening...")
}).catch(error => console.log(error))
