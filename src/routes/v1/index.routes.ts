import { Router } from "express";
import authRoutes from './auth.routes';
const v1Router = Router();

const moduleRoutes: { path: string; route: Router }[] = [
    { path: "/auth", route: authRoutes }
]


moduleRoutes.forEach(({ path, route }) => {
  v1Router.use(path, route);
});

export default v1Router;