import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchasync.utils";
import { AuthServiceImpl } from "../../services/auth/auth.service";
import { AuthRepositoryImpl } from "../../repositories/auth/auth.repository";
import { ApiResponse } from "../../utils/apiresponse.utils";

const authRepository = new AuthRepositoryImpl();
const authService = new AuthServiceImpl(authRepository);

export class AuthController {
    static createUser = catchAsync(async (req: Request, res: Response) => {
        const user = await authService.createUser(req.body);
        res.status(201).json(new ApiResponse(201, "User created successfully.", user));
    });
}