import { TransactionTypes } from "../repositories/cardRepository";
import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"
import * as cardUtils from "../utils/cardUtils.js"
import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import Cryptr from "cryptr";


const cryptr = new Cryptr(process.env.SECRET);

export async function createCard(employeeId: number, cardType: TransactionTypes) {
    const cardholderName = await generateCardName(employeeId);
    const number = generateCardNumber();
    const securityCode = generateSecurityCode();
    const expirationDate = dayjs(Date.now()).add(5, "year").format("MM-YY");
    const cardData = {
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type: cardType
    }

    await cardRepository.insert(cardData);
}

async function generateCardName(employeeId: number) {
    const { fullName } = await employeeRepository.findById(employeeId);

    let NameArr = fullName.split(' ')
    let printName = [];
    for (let i = 0; i < NameArr.length; i++) {
        if (i === 0 || i === NameArr.length - 1) {
            printName.push(NameArr[i])
        } else if (NameArr[i].length > 3) {
            let letters = NameArr[i].split('')
            printName.push(letters[0])
        }
    }
    return printName.join(' ');
}

function generateCardNumber() {
    return faker.finance.creditCardNumber('63[7-9]#-####-####-###L');
}

function generateSecurityCode() {
    const cvc = faker.finance.creditCardCVV();
    console.log(cvc);
    return cryptr.encrypt(cvc);
}

export async function activateCard(id: number, securityCode: string, password: string) {
    const card = await cardUtils.checkCard(id);

    await cardUtils.isCardUnblocked(id);
    await cardUtils.checkCardExpirationDate(card.expirationDate);
    await cardUtils.checkCardCVC(card.securityCode, securityCode);

    const encryptedPassword = bcrypt.hashSync(password, 10);
    await cardRepository.update(id, { password: encryptedPassword, isBlocked: false })
}

export async function getCardBalance(id: number) {
    const transactions = await paymentRepository.findByCardId(id);
    const recharges = await rechargeRepository.findByCardId(id);
    const balance = await generateBalance(transactions, recharges);
    return { balance, transactions, recharges };
}

async function generateBalance(transactions: any[], recharges: any[]) {
    let totalBalance = 0;

    recharges.map(recharge => {
        totalBalance += recharge.amount;
    });

    transactions.map(transaction => {
        totalBalance = totalBalance - transaction.amount;
    });

    return totalBalance;
}

export async function rechargeCard(id : number, amount : number) {
    const {expirationDate} = await cardUtils.checkCard(id);
    await cardUtils.isCardActivated(id);
    await cardUtils.isCardBlocked(id);
    await cardUtils.checkCardExpirationDate(expirationDate)

    await rechargeRepository.insert( {cardId: id, amount} );
  }


  export async function postPayment(id : number, password : string, amount : number, businessId : number ) {
    const {expirationDate, type} = await cardUtils.checkCard(id);
    await cardUtils.isCardActivated(id);
    await cardUtils.checkCardExpirationDate(expirationDate);
    await cardUtils.isCardBlocked(id);
    await cardUtils.checkPassword(id, password);
    await cardUtils.checkBusiness(businessId);
    await cardUtils.checkBusinessType(businessId, type);
    await cardUtils.checkAmount(id, amount);

    await paymentRepository.insert({cardId: id, businessId, amount});
  }