import { IRead } from './Contracts/IRead';
import { IWrite } from './Contracts/IWrite';
import DBAccess from "./DBAccess/DBAccess";
const { ObjectId } = require('mongodb');

export default abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    private _db: any;
    public entity: string;

    constructor(entity: string) {
        if (DBAccess.ModelInstance) this._db = DBAccess.ModelInstance.db(process.env.DATABASE_NAME);
        else
            DBAccess.connect().then((modelInstance: any) => {
                this._db = modelInstance.db(process.env.DATABASE_NAME);
            });
        this.entity = entity;
    }

    async findOne(query: any) {
        return this._db.collection(this.entity).findOne(query);
    }

    async find(query: any, aggregates?: any) {
        if (!aggregates) aggregates = [];
        return this._db.collection(this.entity)
            .aggregate([{ $match: query }, ...aggregates])
            .toArray();
    }

    async getListAsync(query: any, aggregates?: any, session?: any) {
        if (!aggregates) aggregates = [];
        return this._db.collection(this.entity)
            .aggregate([{ $match: query }, ...aggregates], { session })
            .toArray();
    }

    async create(entity: T) {
        delete entity["_id"];
        entity["createdAt"] = new Date();
        entity["updatedAt"] = new Date();
        return this._db.collection(this.entity)
            .insertOne(entity);
    }

    async update(id: any, entity: T) {
        entity["updatedAt"] = new Date();
        return this._db.collection(this.entity)
            .updateOne({ _id: ObjectId(id) }, { $set: entity })
    }

    async delete(_id: any) {
        return this._db.collection(this.entity)
            .deleteMany({ _id: ObjectId(_id) })
    }
}
