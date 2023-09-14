import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { User } from "../entity/User"

export async function getUsers(req: Request, res: Response) {
    const users = await AppDataSource.getRepository(User).find({})
    if (users) {
        return res.send(users).status(200)
    } else {
        return res.send("No users").status(200)
    }
}

export async function addUser(req: Request, res: Response) {
    /*
    {
        "email": "id@uaeu.ac.ae",
        "token": "token"
    }
    */
    if (req.body.email && req.body.token) {
        const user = AppDataSource.getRepository(User).create(req.body)
        const results = await AppDataSource.getRepository(User).save(user)
        return res.send(results).status(200)
    } else {
        return res.send("Missing information in body").status(400)
    }
}