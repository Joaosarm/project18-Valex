import { findById } from "../repositories/employeeRepository.js";
import { Response, Request, NextFunction } from "express";
import { findByApiKey } from "../repositories/companyRepository.js";

export async function checkEmployeeId(employeeId: number) {
    const verification = await findById(employeeId);
    if (!verification) {
        throw {
            type: "not_found",
            message: "Employee not found"
        }
    }
}

export async function checkApiKey(req: Request, res: Response, next: NextFunction) {
    const key: string = req.headers["x-api-key"]?.toString();
    const verification = await findByApiKey(key);
    if (!verification) {
        throw {
            type: "not_found",
            message: "Api key not found"
        }
    }
    next();
}