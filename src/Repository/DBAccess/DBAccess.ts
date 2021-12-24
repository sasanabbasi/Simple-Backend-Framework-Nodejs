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

                        let db = client.db(process.env.DATABASE_NAME);
                        db.collection("customers").createIndex({ "Email": 1 }, { unique: true, name: "UNIQUE_EMAIL" })
                        resolve(DBAccess.ModelInstance);
                    }
                );
        });
    }
}