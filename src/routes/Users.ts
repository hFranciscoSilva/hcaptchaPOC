import { Router } from "express";
import { UserController } from "../controllers/UserController";

//需要添加更多的路由。请帮我。

const routes = Router();
const userController = new UserController();

routes.post("/receiveMessage",userController.log_user)
routes.get("/demo", userController.index)



export { routes };

