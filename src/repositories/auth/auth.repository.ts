import prisma from "../../configs/db.config";
import type { CreateUserDTO } from "../../types/dtos/auth.dto";
import type { UserEntity } from "../../types/entities/auth.entity";
import type { AuthRepository } from "./auth.repository.interface";

export class AuthRepositoryImpl implements AuthRepository {
    async findByEmail(email: string): Promise<UserEntity | null> {
        return prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
        });
    }

    createUser(data: CreateUserDTO): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }

}