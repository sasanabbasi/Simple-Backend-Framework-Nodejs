import { PaginationCustomerDto } from './../Common/DTOs/customerDTO';
import customer from "../Common/Models/customerModel";
import BaseRepository from "../Repository/Base";

export default class CustomersManager extends BaseRepository<customer> {
    constructor() {
        super("customers");
    }

    async getAllByPagination(skip: number, take: number, item: PaginationCustomerDto) {
        let query: any = {};
        if (item.phrase)
            query = {
                ...query,
                $or: [
                    { FirstName: { $regex: new RegExp(item.phrase), $options: 'i' } },
                    { LastName: { $regex: new RegExp(item.phrase), $options: 'i' } },
                    { Email: { $regex: new RegExp(item.phrase), $options: 'i' } },
                    { Mobile: { $regex: new RegExp(item.phrase), $options: 'i' } },
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