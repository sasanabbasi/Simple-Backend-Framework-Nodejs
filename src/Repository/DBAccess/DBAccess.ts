var MongoClient = require("mongodb").MongoClient;

export default class DBAccess {
    static ModelInstance: any;
    static connectionIndex: any = 0;

    constructor() { }

    static async connect() {
        return new Promise((resolve, reject) => {
            if (this.connectionIndex == 0)
                console.log("Database Connection Starting...");
            this.connectionIndex++;
            if (DBAccess.ModelInstance) resolve(DBAccess.ModelInstance);
            else
                MongoClient.connect(
                    process.env.MONGODB_URL,
                    { useNewUrlParser: true },
                    (err, client) => {
                        DBAccess.ModelInstance = client;
                        resolve(DBAccess.ModelInstance);
                    }
                );
        });
    }
}