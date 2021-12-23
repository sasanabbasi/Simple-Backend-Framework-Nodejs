import customer from "../Common/Models/customerModel";
import BaseRepository from "../Repository/Base";

export default class CustomersManager extends BaseRepository<customer> {
    constructor() {
        super("customers");
    }

    async getAllByPagination(skip: number, take: number, filter: any) {
        let query: any = {};
        if (filter.phrase)
            query = {
                ...query,
                $or: [
                    { FirstName: { $regex: new RegExp(filter.phrase), $options: 'i' } },
                    { LastName: { $regex: new RegExp(filter.phrase), $options: 'i' } },
                    { Email: { $regex: new RegExp(filter.phrase), $options: 'i' } },
                    { Mobile: { $regex: new RegExp(filter.phrase), $options: 'i' } },
                ]
            }
        return this.find(query, [
            {
                $skip: skip
            },
            {
                $limit: take
            },
        ]);
    }
}