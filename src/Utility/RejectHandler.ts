import { StatusCodes, getReasonPhrase, } from 'http-status-codes';

export default function RejectHandler(
    error: any,
    errMessage: string = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR): CustomError {
    return new CustomError(error, statusCode, errMessage);
}

export class CustomError {
    constructor(public error: any, public statusCode: number, public errMessage: string) { }
}