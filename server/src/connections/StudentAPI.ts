import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Student } from "../entity/Student";
import { Team } from "../entity/Team";

export async function getStudent(req: Request, res: Response) {
    if (req.params.sid === null) {
        return res.status(400).json({ error: "INCOMPLETE"});
    }
    const sid = req.params.sid;
    const student = await AppDataSource.getRepository(Student).findOne({
        relations: {
            team: true,
        },
        where: {
            sid: sid,
        }
    });
    if (student) {
        return res.status(200).send(student);
    } else return res.status(404);
}

export async function createStudent(req: Request, res: Response) {
    const body = req.body;
    if (!body || !body.sid || !body.fname || !body.lname || !body.school || !body.teamId) {
        return res.status(400).json({error: "Missing information"})
    }
    const team = AppDataSource.getRepository(Team).findOneBy({id: body.teamId});
    body.team = team;
    body.teamId = null;

    const student = AppDataSource.getRepository(Student).create(req.body);
    const result = await AppDataSource.getRepository(Student).save(student);
    return res.status(200).send(result);
}