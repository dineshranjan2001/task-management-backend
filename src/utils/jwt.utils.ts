import fs from "node:fs";
import { importPKCS8, importSPKI, SignJWT, jwtVerify } from "jose";
import { env } from "../configs/env.config";

const privateKey = await importPKCS8(
    fs.readFileSync(
        env.JWT_PRIVATE_KEY_PATH,
        "utf8"
    ),
    "RS256"
);


const publicKey = await importSPKI(
    fs.readFileSync(
        env.JWT_PUBLIC_KEY_PATH,
        "utf8"
    ),
    "RS256"
);


export interface AccessTokenPayload {
    sub: string;
    sid: string;
    tid: string;
    wid: string;
}

export async function generateAccessToken(payload: AccessTokenPayload) {
    return new SignJWT({
        sid: payload.sid,
        tid: payload.tid,
        wid: payload.wid,
        type: "access"
    })
        .setProtectedHeader({
            alg: "HS256",
            typ: 'JWT'
        }).setSubject(payload.sub)
        .setIssuer(env.JWT_ISSUER)
        .setAudience(env.JWT_AUDIENCE)
        .setIssuedAt()
        .setExpirationTime(
            env.ACCESS_TOKEN_EXPIRES_IN
        )
        .sign(privateKey)
        ;
}

export async function verifyAccessToken(token: string) {
    const result = await jwtVerify(
        token,
        publicKey,
        {
            algorithms: ["RS256"],
            issuer: env.JWT_ISSUER,
            audience: env.JWT_AUDIENCE
        }
    );
    return result.payload;
}