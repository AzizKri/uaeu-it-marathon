import { userRouter, defRouter } from "./connections/router"
import { AppDataSource } from "./data-source"
import * as express from "express"
import * as cors from "cors"
var bodyParser = require('body-parser')

const secret = "Bearer 662cdd4f-0c59-49f7-a6c5-c0556478e8ac";

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
    app.use("/users/v1", userRouter)

    // start express server
    app.listen(3000)
    console.log("Initialized. Listening...")
}).catch(error => console.log(error))
