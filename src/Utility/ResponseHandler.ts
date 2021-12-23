import { Response } from "express";
import Mapper from "../Common/Mapper";

export default function ResponseHandler(res: Response, data: any, err: any,
    sourceType?: any, destinationType?: any, take: number = 0, skip: number = 0): void {
    let totalRecords = 0,
        errMessage = err && err.errMessage ? err.errMessage : null,
        error = err && err.error ? err.error : null,
        code = err && err.statusCode ? err.statusCode : 200;

    if (data && Array.isArray(data) && data.length && data[0].totalCount)
        totalRecords = parseInt(data[0].totalCount.toString());

    if (data && sourceType && destinationType) {
        data = JSON.parse(JSON.stringify(data))
        if (Array.isArray(data))
            data = data.map(item => Mapper.mapper.map(item, destinationType, sourceType));
        else
            data = Mapper.mapper.map(data, destinationType, sourceType);
    }
    res.status(code).send({
        status: code,
        error: error,
        errMessage: errMessage,
        payload: {
            data: data ? data : null,
            totalRecords,
            skip,
            take
        }
    });
}