import { Request, Response, NextFunction, Router } from "express";
import CustomersManager from "../Logic/CustomersManager";

export class CustomersController {
    router: Router;
    manager: CustomersManager;

    constructor() {
        this.router = Router();
        this.manager = new CustomersManager();
        this.init();
    }

    init() {
    }
}

export default new CustomersController().router;