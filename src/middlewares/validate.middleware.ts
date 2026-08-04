import type { NextFunction, Request, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

import { ZodError, ZodObject, type ZodRawShape } from "zod";

interface ValidationSchema {
    body?: ZodObject<ZodRawShape>;
    params?: ZodObject<ZodRawShape>;
    query?: ZodObject<ZodRawShape>
}


export const validate = (schema: ValidationSchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (schema.body) {
            req.body = await schema.body.parseAsync(req.body);
        }
        if (schema.params) {
            req.params = (await schema.params.parseAsync(req.params)) as ParamsDictionary;
        }

        if (schema.query) {
            req.query = (await schema.query.parseAsync(req.query)) as unknown as ParsedQs;
        }
        next();
    } catch (error: unknown) {
        next(error);
    }
}