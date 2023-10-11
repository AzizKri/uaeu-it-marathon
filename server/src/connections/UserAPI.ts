import { Request, Response } from "express";
import { LoginTicket, OAuth2Client } from "google-auth-library";
import { JwtPayload } from "jsonwebtoken";
const jwt = require('jsonwebtoken')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function authenticateSupervisor(req: Request, res: Response) {
    const token = req.body.token;

    if (!req.body || !token) {
        return res.status(400).json({error: "NO_TOKEN"})
    }

    let ticket: LoginTicket;

    try {
        ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
    } catch (e) {
        return res.status(400).json({e});
    }

    const payload = ticket.getPayload();

    const supervisor = await fetch(`https://api.uaeu.club/itmarathon/supervisor/${payload.email}`)
    if (payload === undefined || supervisor === undefined) {
        return res.status(405).json({error: "NO_ACCESS"})
    }

    const jwtToken = jwt.sign(<JwtPayload>{
        email: payload.email,
        
    })
}

