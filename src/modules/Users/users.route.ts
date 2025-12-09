import { Router } from "express"
import { UserController } from "./user.controller"
import auth from "../../middleware/auth"
import { Roles } from "../Auth/auth.constant"

const router = Router()

router.get("/",auth(Roles.admin,Roles.customer),UserController.AllUsers)

router.put("/:userId",UserController.SingleUserUpdate)

router.delete("/:userId",UserController.SingleUserDelete)



export const UserRouter = {
    router,
}