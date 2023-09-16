import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Team } from "../entity/Team";
import { Student } from "../entity/Student";
import { Supervisor } from "../entity/Supervisor";

export async function getTeam(req: Request, res: Response) {
    const teamId = req.params.id;
    if (!teamId) {
        return res.status(400).json({error: "INCOMPLETE"});
    };

    const getEntity = async () => {
        const team = AppDataSource.getRepository(Team).findOneByOrFail({
            id: teamId,
        }).then(() => {
            return res.status(200).send(team);
        }).catch((e) => {
            e.error = "NO_SUCH_TEAM"
            return res.status(404).send(e);
        });
    };
    getEntity();
}

export async function createTeam(req: Request, res: Response) {
    // Authorization

    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'NO_ACCESS' });
    } else if (req.headers.authorization !== process.env.AUTH_SECRET_ADMIN) {
        return res.status(403).json({ error: 'UNAUTHORIZED' });
    }

    // Verify Data

    const body = req.body;
    if (!body || !body.id || !body.name || !body.school || !body.members || !body.supervisor) {
        return res.status(400).json({error: "INCOMPLETE"});
    }
    
    // Existing team?

    const teamRepo = AppDataSource.getRepository(Team);
    if (await teamRepo.findOneBy({id: body.id})) {
        return res.status(400).json({error: "ALREADY_EXIST"})
    }

    // Gather members

    const members = [];
    for (let i = 0; i < body.members.length - 1; i++) {
        let id = body.members[i];
        console.log(id);
        const getMember = async () => {
            const member = await AppDataSource.getRepository(Student).findOneByOrFail({
                sid: id,
            }).then(() => {
                console.log("then")
                console.log(member)
                if (member.school != body.school) {
                    console.log({error: "SCHOOL_MISMATCH", school: body.school, student: member})
                    return res.status(400).json({error: "SCHOOL_MISMATCH", school: body.school, student: member});
                } else {
                    console.log("pushing ", member)
                    members.push(member)
                    console.log("pushed ", member)
                };
            }).catch((e) => {
                console.log(e)
                return res.status(404).json({error: "NO_SUCH_STUDENT"})
            })
        }
        await getMember();
    }

    // Create Team

    const team = new Team();
    team.id = body.id;
    team.name = body.name;
    team.school = body.school;
    team.members = members;

    // Get Supervisor

    const getEntity = async () => {
        const supervisor = await AppDataSource.getRepository(Supervisor).findOneByOrFail({
            id: body.supervisor
        }).then(() => {
            if (supervisor.school != body.school) {
                return res.status(400).json({error: "SCHOOL_MISMATCH", school: body.school, supervisor: supervisor});
            } else team.supervisor = supervisor;
        }).catch((e) => {
            return res.status(404).json({error: "NO_SUCH_SUPERVISOR"})
        });
    };
    getEntity();

    const results = await teamRepo.save(team);
    return res.status(200).send(results);
}

