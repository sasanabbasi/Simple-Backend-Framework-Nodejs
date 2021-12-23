import * as spdy from "spdy";
import * as fs from "fs";
import * as debug from "debug";
import App from "./app";
import DBAccess from "./Repository/DBAccess/DBAccess";
import Mapper from "./Common/Mapper";

let server;
let port;
(async function () {
    // Connect to Database
    await DBAccess.connect();
    console.log("Database Connected Successfully!");

    // Set running port
    port = normalizePort(process.env.PORT || 3000);
    App.set("port", port);

    // Initiate Mapper for bindings
    Mapper.initiate();

    var options = {
        // Private key 
        key: fs.readFileSync(__dirname + '/Assets/Certificates/localhost-private.pem'),

        // Fullchain file or cert file (prefer the former)
        cert: fs.readFileSync(__dirname + '/Assets/Certificates/localhost-cert.pem'),

        // **optional** SPDY-specific options
        spdy: {
            protocols: ['h2', 'spdy/3.1', 'http/1.1'],
        }
    };

    // Create server and run the server
    server = spdy.createServer(options, App);
    server.listen(port);

    // Event handling while running the server
    server.on("error", onError);
    server.on("listening", onListening);
})();

// Normalize the running port
function normalizePort(val: number | string): number | string | boolean {
    let port: number = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

// Handle the error of the server
function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") throw error;
    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Successfully run the server
function onListening(): void {
    let addr = server.address();
    let bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    console.log("Server is available on port " + port);

    debug(`Listening on ${bind}`);
}

module.exports = server;
