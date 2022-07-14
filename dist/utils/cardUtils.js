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
import dayjs from "dayjs";
import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import * as cardRepository from "../repositories/cardRepository.js";
import * as businessRepository from "../repositories/businessRepository.js";
import { getCardBalance } from "../services/cardServices.js";
var cryptr = new Cryptr(process.env.SECRET);
export function checkCardExpirationDate(expirationDate) {
    return __awaiter(this, void 0, void 0, function () {
        var isCardExpired;
        return __generator(this, function (_a) {
            isCardExpired = dayjs(expirationDate).isBefore(dayjs(Date.now()).format("MM-YY"));
            if (isCardExpired) {
                throw {
                    type: "Invalid requisition",
                    message: "Card already expired"
                };
            }
            return [2 /*return*/];
        });
    });
}
export function checkCardCVC(inputCVC, databaseCVC) {
    return __awaiter(this, void 0, void 0, function () {
        var encriptedInputCVC;
        return __generator(this, function (_a) {
            encriptedInputCVC = cryptr.decrypt(inputCVC);
            if (encriptedInputCVC !== databaseCVC) {
                throw {
                    type: 'Invalid requisition',
                    message: "CVC doesn't match"
                };
            }
            return [2 /*return*/];
        });
    });
}
export function checkPassword(id, password) {
    return __awaiter(this, void 0, void 0, function () {
        var DBpassword, verified;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findById(id)];
                case 1:
                    DBpassword = (_a.sent()).password;
                    verified = bcrypt.compareSync(password, DBpassword);
                    if (!verified) {
                        throw {
                            type: "Invalid requisition",
                            message: "Incorrect password"
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export function checkCard(id) {
    return __awaiter(this, void 0, void 0, function () {
        var card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findById(id)];
                case 1:
                    card = _a.sent();
                    if (!card) {
                        throw {
                            type: "Not found",
                            message: "Non-existing card"
                        };
                    }
                    return [2 /*return*/, card];
            }
        });
    });
}
export function isCardActivated(id) {
    return __awaiter(this, void 0, void 0, function () {
        var card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findById(id)];
                case 1:
                    card = _a.sent();
                    if (!card.password) {
                        throw {
                            type: "Invalid requisition",
                            message: "Non-activated card"
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export function isCardBlocked(id) {
    return __awaiter(this, void 0, void 0, function () {
        var card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findById(id)];
                case 1:
                    card = _a.sent();
                    if (card.isBlocked) {
                        throw {
                            type: 'Invalid requisition',
                            message: 'Card already blocked'
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export function isCardUnblocked(id) {
    return __awaiter(this, void 0, void 0, function () {
        var card;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, cardRepository.findById(id)];
                case 1:
                    card = _a.sent();
                    if (!card.isBlocked) {
                        throw {
                            type: 'Invalid requisition',
                            message: 'Card already activated'
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export function checkBusiness(businessId) {
    return __awaiter(this, void 0, void 0, function () {
        var business;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, businessRepository.findById(businessId)];
                case 1:
                    business = _a.sent();
                    if (!business) {
                        throw {
                            type: 'Invalid requisition',
                            message: 'Business does not exist'
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export function checkBusinessType(businessId, type) {
    return __awaiter(this, void 0, void 0, function () {
        var business;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, businessRepository.findById(businessId)];
                case 1:
                    business = _a.sent();
                    if (business.type !== type) {
                        throw {
                            type: 'Invalid requisition',
                            message: 'Card is not the same type as business'
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export function checkAmount(id, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCardBalance(id)];
                case 1:
                    balance = (_a.sent()).balance;
                    if (balance < amount) {
                        throw {
                            type: 'Invalid requisition',
                            message: 'Not enough balance to pay'
                        };
                    }
                    return [2 /*return*/];
            }
        });
    });
}
