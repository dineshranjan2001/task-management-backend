import type { CreateUserDTO } from "../../types/auth/dto/auth.dto";
import type { UserEntity } from "../../types/auth/entity/auth.entity";

export interface AuthService{
    createUser(data: CreateUserDTO): Promise<UserEntity>;
}