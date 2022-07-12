import { Request, Response } from "express";
import * as cardServices from "../services/cardServices.js";


export async function activateCard(req: Request, res: Response) {
    const {id, securityCode, password} = req.body;
    await cardServices.activateCard(id, securityCode, password);
    console.log('Card Activated!');
    res.sendStatus(200);
}