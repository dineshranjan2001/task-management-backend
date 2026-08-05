import type { Request, Response } from "express";
import { RoleMasterRepositoryImpl } from "../../repositories/masters/rolemaster.repository";
import { RoleMasterServiceImpl } from "../../services/masters/rolemaster.service";
import type { CreateRoleMasterDTO } from "../../types/dtos/rolemaster.dto";
import { ApiResponse } from "../../utils/apiresponse.utils";
import { catchAsync } from "../../utils/catchasync.utils";
import type { RoleMasterEntity } from "../../types/entities/rolemaster.entity";


const roleMasterRepository = new RoleMasterRepositoryImpl();
const roleMasterService = new RoleMasterServiceImpl(roleMasterRepository);

export class RoleMasterController {

    static createRole = catchAsync(async (req: Request<{},{},CreateRoleMasterDTO>, res: Response<ApiResponse<RoleMasterEntity>>) => {
        const createdRoleDetails = await roleMasterService.createRole(req.body);
        res.status(201).json(new ApiResponse(201, "Role created successfully.", createdRoleDetails));
    });
}