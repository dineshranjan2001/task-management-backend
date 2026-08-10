import type { NextFunction, Request, Response } from "express";
import { logger } from "../configs/logger.config";
import { ApiError } from "../utils/apierror.utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import jwt from "jsonwebtoken";
import z, { ZodError } from "zod";


export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.error(err);
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err?.message
        });
    }

    if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                return res.status(409).json({
                    success: false,
                    message: "Duplicate record.",
                });

            case "P2025":
                return res.status(404).json({
                    success: false,
                    message: "Record not found.",
                });
        }
    }

    if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
            success: false,
            message: "Token expired",
        });
    }

    if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            code: "VALIDATION_ERROR",
            message: "Validation failed",
            errors: z.flattenError(err)
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
}