import { Response, Request } from "express";
import { checkEmployeeId } from "../middlewares/cardMiddlewares.js";
import { TransactionTypes } from "../repositories/cardRepository.js";
import * as cardServices from "../services/cardServices.js"

export async function createCard(req: Request, res: Response){
    const {employeeId, cardType} : {employeeId : number, cardType: TransactionTypes} = req.body;

    await checkEmployeeId(employeeId);
    await cardServices.createCard( employeeId, cardType);
    res.sendStatus(201);
}