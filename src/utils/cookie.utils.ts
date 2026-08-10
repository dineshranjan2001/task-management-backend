import type { Response } from "express";
import { env } from "../configs/env.config";

export function setRefreshTokenCookie(
    res: Response,
    token: string,
    expiresAt: Date
) {
    res.cookie(
        env.COOKIE_NAME,
        token,
        {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: env.NODE_ENV === "production" ? "strict" : "lax",
            expires: expiresAt,
            path: "/api/v1/auth"
        }
    );
}


export function clearRefreshTokenCookie(res: Response) {
    res.clearCookie(
        env.COOKIE_NAME,
        {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: env.NODE_ENV === "production" ? "strict" : "lax",
            path: "/api/v1/auth"
        }
    )
}