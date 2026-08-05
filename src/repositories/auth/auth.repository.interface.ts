import type { CreateUserDTO } from "../../types/dtos/auth.dto";
import type { UserEntity } from "../../types/entities/auth.entity";

export interface AuthRepository{
    findByEmail(email:string):Promise<UserEntity | null>;
    createUser(data: CreateUserDTO): Promise<UserEntity>;
}