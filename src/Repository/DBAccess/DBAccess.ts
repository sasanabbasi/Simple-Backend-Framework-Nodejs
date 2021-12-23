var MongoClient = require("mongodb").MongoClient;

export default class DBAccess {
    static ModelInstance: any;

    constructor() { }

    static async connect() {
        return new Promise((resolve, reject) => {
            console.log("Database Connection Starting...");
            if (DBAccess.ModelInstance) resolve(DBAccess.ModelInstance);
            else
                MongoClient.connect(
                    process.env.MONGODB_URL,
                    { useNewUrlParser: true },
                    (err, client) => {
                        console.log("Database Connected Successfully!");
                        DBAccess.ModelInstance = client;
                        resolve(DBAccess.ModelInstance);
                    }
                );
        });
    }
}