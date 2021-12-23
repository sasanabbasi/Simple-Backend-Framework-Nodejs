import { NextFunction, Request, Response } from 'express';
import ResponseHandler from '../Utility/ResponseHandler';

export default function exception(error: any, req: Request, res: Response, next: NextFunction) {
    ResponseHandler(res, null, error);
}