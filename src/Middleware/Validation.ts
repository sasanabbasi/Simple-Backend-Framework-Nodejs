import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import ResponseHandler from "../Utility/ResponseHandler";
import { StatusCodes } from 'http-status-codes';

function validation<T>(type: any, skipMissingProperties = false, whitelist = true, forbidNonWhitelisted = false): RequestHandler {
    return (req, res, next) => {
        validate(plainToClass(type, req.body), { skipMissingProperties, whitelist, forbidNonWhitelisted })
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                    ResponseHandler(res, null, {
                        statusCode: StatusCodes.BAD_REQUEST,
                        error: errors.map((error: ValidationError) => ({
                            ...error,
                            target: undefined
                        })),
                        errMessage: message
                    });
                } else next();
            });
    };
}

export default validation;