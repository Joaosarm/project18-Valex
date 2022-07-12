import { Request, Response } from "express";
import * as cardUtils from "../utils/cardUtils.js";
import * as cardRepository from "../repositories/cardRepository.js"


export async function blockCard(req: Request, res: Response) {
    const { id, password }: { id: number, password: string } = req.body;

    const { expirationDate } = await cardUtils.checkCard(id);
    await cardUtils.checkCardExpirationDate(expirationDate);
    await cardUtils.isCardBlocked(id);
    await cardUtils.checkPassword(id, password);
    await cardRepository.update(id, { isBlocked: true })

    return res.sendStatus(200);
}

export async function unblockCard(req: Request, res: Response) {
    const { id, password }: { id: number, password: string } = req.body;

    const { expirationDate } = await cardUtils.checkCard(id);
    await cardUtils.checkCardExpirationDate(expirationDate);
    await cardUtils.isCardUnblocked(id);
    await cardUtils.checkPassword(id, password);
    await cardRepository.update(id, { isBlocked: false })

    return res.sendStatus(200);
}