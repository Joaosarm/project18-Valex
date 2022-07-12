import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import * as cardRepository from "../repositories/cardRepository.js"
import * as businessRepository from "../repositories/businessRepository.js";
import { getCardBalance } from "../services/cardServices.js";

const cryptr = new Cryptr(process.env.SECRET);

export async function checkCardExpirationDate(expirationDate: string) {
  const isCardExpired = dayjs(expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"));
  if (isCardExpired) {
    throw {
      type: "Invalid requisition",
      message: "Card already expired"
    }
  }
}

export async function checkCardCVC(inputCVC: string, databaseCVC: string) {
  const encriptedInputCVC = cryptr.decrypt(inputCVC);
  if (encriptedInputCVC !== databaseCVC) {
    throw {
      type: 'Invalid requisition',
      message: "CVC doesn't match"
    }
  }
}

export async function checkPassword(id: number, password: string) {
  const DBpassword = (await cardRepository.findById(id)).password;
  const verified = bcrypt.compareSync(password, DBpassword);
  if (!verified) {
    throw {
      type: "Invalid requisition",
      message: "Incorrect password"
    }
  }
}

export async function checkCard(id: number) {
  const card = await cardRepository.findById(id);
  if (!card) {
    throw {
      type: "Not found",
      message: "Non-existing card"
    }
  }
  return card;
}

export async function isCardActivated(id: number) {
  const card = await cardRepository.findById(id)
  if (!card.password) {
    throw {
      type: "Invalid requisition",
      message: "Non-activated card"
    }
  }
}

export async function isCardBlocked(id: number) {
  const card = await cardRepository.findById(id)
  if (card.isBlocked) {
    throw {
      type: 'Invalid requisition',
      message: 'Card already blocked'
    }
  }
}

export async function isCardUnblocked(id: number) {
  const card = await cardRepository.findById(id)
  if (!card.isBlocked) {
    throw {
      type: 'Invalid requisition',
      message: 'Card already activated'
    }
  }
}

export async function checkBusiness(businessId: number) {
  const business = await businessRepository.findById(businessId);

  if (!business) {
    throw {
      type: 'Invalid requisition',
      message: 'Business does not exist'
    }
  }
}

export async function checkBusinessType(businessId: number, type: cardRepository.TransactionTypes) {
  const business = await businessRepository.findById(businessId);
  if (business.type!==type) {
    throw {
      type: 'Invalid requisition',
      message: 'Card is not the same type as business'
    }
  }
}

export async function checkAmount(id: number, amount: number) {
  const { balance } = await getCardBalance(id); 
  if (balance<amount) {
    throw {
      type: 'Invalid requisition',
      message: 'Not enough balance to pay'
    }
  }
}