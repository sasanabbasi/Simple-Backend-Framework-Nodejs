import * as cors from "cors";
import * as express from "express";
import * as compression from "compression";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

// Controllers
import CustomersController from "./Controller/CustomersController";

// Services
import exception from "./Middleware/Exception";

export class App {
    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.afterRouteMiddleware()
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger("dev"));
        this.express.use(cors({ credentials: true }));
        this.express.use(cookieParser());
        this.express.use(bodyParser.json());
        this.express.use(compression());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure API endpoints.
    private routes(): void {
        let router = express.Router();
        this.express.use("/", router);
        this.express.use("/customer", CustomersController);
    }

    private afterRouteMiddleware(): void {
        this.express.use(exception);
    }
}

export default new App().express;
