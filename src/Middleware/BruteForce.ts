import { Router, Response, NextFunction, Request } from "express";
import * as ExpressBrute from "express-brute";
const store = new ExpressBrute.MemoryStore();

export default class BruteForce {
    static bruteFailCallback(
        req: Request,
        res: Response,
        next: NextFunction,
        nextValidRequestDate: Date
    ) {
        res.status(429).send("too many request from your ip!");
    }

    static bruteHandleStateError(error: any) {
        console.log("error");
    }
    static getGlobalBruteForce = new ExpressBrute(store, {
        freeRetries: 100,
        attachResetToRequest: false,
        refreshTimeoutOnRequest: false,
        minWait: 3000,
        maxWait: 30000,
        lifetime: 60 * 60, // 1 Hour (seconds not milliseconds)
        failCallback: BruteForce.bruteFailCallback,
        handleStoreError: BruteForce.bruteHandleStateError,
    });
}