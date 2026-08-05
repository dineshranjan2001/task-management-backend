import type { CreateUserDTO } from "../../types/dtos/auth.dto";
import type { UserEntity } from "../../types/entities/auth.entity";

export interface AuthService{
    createUser(data: CreateUserDTO): Promise<UserEntity>;
}