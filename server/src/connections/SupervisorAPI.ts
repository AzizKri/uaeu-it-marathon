import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Supervisor } from "../entity/Supervisor";
import { Team } from "../entity/Team";
import "dotenv/config"

export async function getSupervisor(req: Request, res: Response) {
    if (req.params.id === null) {
        return res.status(400).json({ error: "INCOMPLETE"});
    };
    const id = req.params.id;
    const getEntity = async () => {
        const supervisor = await AppDataSource.getRepository(Supervisor).findOneOrFail({
            relations: {
                team: true,
            },
            where: {
                id: id,
            }
        }).then(() => {
            return res.status(200).send(supervisor);
        }).catch((e) => {
            return res.status(404).send(e)
        });
    };
    getEntity();
};

export async function getSupervisorByEmail(req: Request, res: Response) {
    if (req.params.email === null) {
        return res.status(400).json({ error: "INCOMPLETE"});
    };
    const email = req.params.email;
    const getEntity = async () => {
        const supervisor = await AppDataSource.getRepository(Supervisor).findOneByOrFail({
            email: email,
        }).then(() => {
            return res.status(200).send(supervisor);
        }).catch((e) => {
            return res.status(404).send(e)
        });
    };
    getEntity();
};

export async function createSupervisor(req: Request, res: Response) {
    // Authorization

    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'NO_ACCESS' });
    } else if (req.headers.authorization !== process.env.AUTH_SECRET_ADMIN) {
        return res.status(403).json({ error: 'UNAUTHORIZED' });
    }

    // Check Data

    const body = req.body;
    if (!body || !body.id || !body.fname || !body.lname || !body.school) {
        return res.status(400).json({error: "INCOMPLETE"})
    };
    if (await AppDataSource.getRepository(Supervisor).findOneBy({id: body.id})) {
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

    const supervisor = AppDataSource.getRepository(Supervisor).create(body);
    const result = await AppDataSource.getRepository(Supervisor).save(supervisor);
    return res.status(200).send(result);
}