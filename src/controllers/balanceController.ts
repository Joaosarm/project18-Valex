import { Request, Response } from "express";
import * as cardUtils from "../utils/cardUtils.js"
import * as cardServices from "../services/cardServices.js"

export async function getCardBalance(req: Request, res: Response) {
  const { id, password }: { id: number, password: string } = req.body;

  await cardUtils.checkCard(id);
  await cardUtils.isCardActivated(id);
  await cardUtils.checkPassword(id, password);
  const balance = await cardServices.getCardBalance(id);

  return res.status(200).send(balance);
}

export async function rechargeCard(req: Request, res: Response) {
  const { id, amount } = req.body;

  await cardServices.rechargeCard(id, amount);
  res.sendStatus(200);
}

export async function postPayment(req: Request, res: Response) {
  const { id, password, businessId, amount } = req.body;

  await cardServices.postPayment(id, password, amount, businessId);
  res.sendStatus(200);
}