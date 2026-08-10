import type { NextFunction, Request, Response } from "express";
import z, { ZodError, type ZodType } from "zod";

interface ValidationSchema {
    body?: ZodType;
    params?: ZodType;
    query?: ZodType;
}

export const validate = (schema: ValidationSchema) =>
    async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
        try {
            if (schema.body) {
                req.body = await schema.body.parseAsync(req.body);
            }

            if (schema.params) {
                req.params = (await schema.params.parseAsync(req.params)) as typeof req.params;
            }

            if (schema.query) {
                const parsedQuery = await schema.query.parseAsync(req.query);
                // req.query is a read-only getter in Express 5 — reassigning
                // directly throws. Redefine the property instead.
                Object.defineProperty(req, "query", {
                    value: parsedQuery,
                    writable: true,
                    configurable: true,
                });
            }

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return next(
                    Object.assign(error, {
                        statusCode: 400,
                        details: z.flattenError(error),
                    })
                );
            }
            next(error);
        }
    };