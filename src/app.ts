import * as cors from "cors";
import * as express from "express";
import * as compression from "compression";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import "reflect-metadata";

// Controllers
import CustomersController from "./Controller/CustomersController";

// Services
import BruteForce from "./Middleware/BruteForce";
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

        // Brute Force support
        this.express.use(
            BruteForce.getGlobalBruteForce.getMiddleware({
                key: function (req, res, next) {
                    // prevent too many attempts for the same username
                    next(req.url);
                },
            })
        );
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
