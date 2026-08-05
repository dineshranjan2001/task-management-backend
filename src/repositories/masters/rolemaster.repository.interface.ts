import type { CreateRoleMasterDTO } from "../../types/dtos/rolemaster.dto";
import type { RoleMasterEntity } from "../../types/entities/rolemaster.entity";

export interface RoleMasterRepository{
    createRole(data: CreateRoleMasterDTO): Promise<RoleMasterEntity>;
}