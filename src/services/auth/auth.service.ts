import { AuthRepositoryImpl } from "../../repositories/auth/auth.repository";
import type { AuthRepository } from "../../repositories/auth/auth.repository.interface";
import type { CreateUserDTO } from "../../types/auth/dto/auth.dto";
import type { UserEntity } from "../../types/auth/entity/auth.entity";
import { ApiError } from "../../utils/apierror.utils";
import type { AuthService } from "./auth.service.interface";
import bcrypt from "bcrypt";



const userRepository = new AuthRepositoryImpl();

const envSalt = process.env.SALT_ROUNDS;
const SALT_ROUNDS: number = envSalt ? parseInt(envSalt, 10) : 10;

export class AuthServiceImpl implements AuthService {

    constructor(private readonly authRepository: AuthRepository) { }

    async createUser(data: CreateUserDTO): Promise<UserEntity> {
        const existingUser = await this.authRepository.findByEmail(data.email);
        if (existingUser) {
            throw new ApiError(400, "User already exist.");
        }
        const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
        return this.authRepository.createUser({
            ...data,
            password: hashedPassword,
        });
    }
}