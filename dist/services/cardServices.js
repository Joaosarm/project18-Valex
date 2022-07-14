var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as cardUtils from "../utils/cardUtils.js";
import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import Cryptr from "cryptr";
var cryptr = new Cryptr(process.env.SECRET);
export function createCard(employeeId, cardType) {
    return __awaiter(this, void 0, void 0, function () {
        var cardholderName, number, securityCode, expirationDate, cardData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, generateCardName(employeeId)];
                case 1:
                    cardholderName = _a.sent();
                    number = generateCardNumber();
                    securityCode = generateSecurityCode();
                    expirationDate = dayjs(Date.now()).add(5, "year").format("MM-YY");
                    cardData = {
                        employeeId: employeeId,
                        number: number,
                        cardholderName: cardholderName,
                        securityCode: securityCode,
                        expirationDate: expirationDate,
                        password: null,
                        isVirtual: false,
                        originalCardId: null,
                        isBlocked: true,
                        type: cardType
                    };
                    return [4 /*yield*/, cardRepository.insert(cardData)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function generateCardName(employeeId) {
    return __awaiter(this, void 0, void 0, function () {
        var fullName, NameArr, printName, i, letters;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, employeeRepository.findById(employeeId)];
                case 1:
                    fullName = (_a.sent()).fullName;
                    NameArr = fullName.split(' ');
                    printName = [];
                    for (i = 0; i < NameArr.length; i++) {
                        if (i === 0 || i === NameArr.length - 1) {
                            printName.push(NameArr[i]);
                        }
                        else if (NameArr[i].length > 3) {
                            letters = NameArr[i].split('');
                            printName.push(letters[0]);
                        }
                    }
                    return [2 /*return*/, printName.join(' ')];
            }
        });
    });
}
function generateCardNumber() {
    return faker.finance.creditCardNumber('63[7-9]#-####-####-###L');
}
function generateSecurityCode() {
    var cvc = faker.finance.creditCardCVV();
    return cryptr.encrypt(cvc);
}
export function activateCard(id, securityCode, password) {
    return __awaiter(this, void 0, void 0, function () {
        var card, encryptedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardUtils.checkCard(id)];
                case 1:
                    card = _a.sent();
                    return [4 /*yield*/, cardUtils.isCardUnblocked(id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, cardUtils.checkCardExpirationDate(card.expirationDate)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, cardUtils.checkCardCVC(card.securityCode, securityCode)];
                case 4:
                    _a.sent();
                    encryptedPassword = bcrypt.hashSync(password, 10);
                    return [4 /*yield*/, cardRepository.update(id, { password: encryptedPassword, isBlocked: false })];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function getCardBalance(id) {
    return __awaiter(this, void 0, void 0, function () {
        var transactions, recharges, balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, paymentRepository.findByCardId(id)];
                case 1:
                    transactions = _a.sent();
                    return [4 /*yield*/, rechargeRepository.findByCardId(id)];
                case 2:
                    recharges = _a.sent();
                    return [4 /*yield*/, generateBalance(transactions, recharges)];
                case 3:
                    balance = _a.sent();
                    return [2 /*return*/, { balance: balance, transactions: transactions, recharges: recharges }];
            }
        });
    });
}
function generateBalance(transactions, recharges) {
    return __awaiter(this, void 0, void 0, function () {
        var totalBalance;
        return __generator(this, function (_a) {
            totalBalance = 0;
            recharges.map(function (recharge) {
                totalBalance += recharge.amount;
            });
            transactions.map(function (transaction) {
                totalBalance = totalBalance - transaction.amount;
            });
            return [2 /*return*/, totalBalance];
        });
    });
}
export function rechargeCard(id, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var expirationDate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardUtils.checkCard(id)];
                case 1:
                    expirationDate = (_a.sent()).expirationDate;
                    return [4 /*yield*/, cardUtils.isCardActivated(id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, cardUtils.isCardBlocked(id)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, cardUtils.checkCardExpirationDate(expirationDate)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, rechargeRepository.insert({ cardId: id, amount: amount })];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function postPayment(id, password, amount, businessId) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, expirationDate, type;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, cardUtils.checkCard(id)];
                case 1:
                    _a = _b.sent(), expirationDate = _a.expirationDate, type = _a.type;
                    return [4 /*yield*/, cardUtils.isCardActivated(id)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, cardUtils.checkCardExpirationDate(expirationDate)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, cardUtils.isCardBlocked(id)];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, cardUtils.checkPassword(id, password)];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, cardUtils.checkBusiness(businessId)];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, cardUtils.checkBusinessType(businessId, type)];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, cardUtils.checkAmount(id, amount)];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, paymentRepository.insert({ cardId: id, businessId: businessId, amount: amount })];
                case 9:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
