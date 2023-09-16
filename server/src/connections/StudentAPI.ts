import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Student } from "../entity/Student";
import { Team } from "../entity/Team";

export async function getStudent(req: Request, res: Response) {
    if (req.params.sid === null) {
        return res.status(400).json({ error: "INCOMPLETE"});
    };
    const sid = req.params.sid;
    const getEntity = async () => {
        const student = await AppDataSource.getRepository(Student).findOneOrFail({
            relations: {
                team: true,
            },
            where: {
                sid: sid,
            }
        }).then(() => {
            return res.status(200).send(student);
        }).catch((e) => {
            return res.status(404).send(e)
        });
    };
    getEntity();
};

export async function createStudent(req: Request, res: Response) {
    const body = req.body;
    if (!body || !body.sid || !body.fname || !body.lname || !body.school) {
        return res.status(400).json({error: "INCOMPLETE"})
    };
    if (await AppDataSource.getRepository(Student).findOneBy({sid: body.sid})) {
        return res.status(400).json({error: "ALREADY_EXIST"})
    };
    
    if (body.teamId) {
        const getTeam = async () => {
            const team = AppDataSource.getRepository(Team).findOneByOrFail({
                id: body.teamId
            }).then(() => {
                body.team = team;
                body.teamId = null;
            }).catch((e) => {
                return res.status(404).send(e)
            });
        }
        getTeam();
    }

    const student = AppDataSource.getRepository(Student).create(body);
    const result = await AppDataSource.getRepository(Student).save(student);
    return res.status(200).send(result);
}