import prisma from "../../configs/db.config";
import type { CreateRoleMasterDTO } from "../../types/dtos/rolemaster.dto";
import type { RoleMasterEntity } from "../../types/entities/rolemaster.entity";
import type { RoleMasterRepository } from "./rolemaster.repository.interface";

export class RoleMasterRepositoryImpl implements RoleMasterRepository {

    async createRole(data: CreateRoleMasterDTO): Promise<RoleMasterEntity> {
        return await prisma.roleMaster.create({
            data,
        });
    }

}