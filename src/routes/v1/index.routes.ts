import { Router } from "express";
import authRoutes from './auth.routes';
import roleRoutes from './rolemaster.routes';
const v1Router = Router();

const moduleRoutes: { path: string; route: Router }[] = [
    { path: "/auth", route: authRoutes },
    { path: "/master/role", route: roleRoutes },
]


moduleRoutes.forEach(({ path, route }) => {
  v1Router.use(path, route);
});

export default v1Router;