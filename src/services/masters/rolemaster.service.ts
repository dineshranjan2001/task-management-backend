import type { RoleMasterRepository } from "../../repositories/masters/rolemaster.repository.interface";
import type { CreateRoleMasterDTO } from "../../types/dtos/rolemaster.dto";
import type { RoleMasterEntity } from "../../types/entities/rolemaster.entity";
import type { RoleMasterService } from "./rolemaster.service.interface";

export class RoleMasterServiceImpl implements RoleMasterService{
     constructor(private readonly roleMasterRepository: RoleMasterRepository) { }

      async createRole(data: CreateRoleMasterDTO): Promise<RoleMasterEntity>{
        const cretaedRoleDetails=await this.roleMasterRepository.createRole(data);
        return cretaedRoleDetails;
      }
}