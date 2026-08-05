import { Router } from "express";
import { RoleMasterController } from "../../controllers/masters/rolemaster.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createRoleMasterSchema } from "../../validations/masters/createrolemaster.validation";
// import { login, logout, refreshToken, register } from "./auth.controller.js";

const router = Router();

 router.post("/register",validate(createRoleMasterSchema), RoleMasterController.createRole);
// router.post("/login", login);
// router.post("/logout", logout);
// router.post("/refresh-token", refreshToken);

export default router;