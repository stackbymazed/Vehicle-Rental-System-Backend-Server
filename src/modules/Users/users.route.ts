import { Router } from "express"
import { UserController } from "./user.controller"
import auth from "../../middleware/auth"
import { Roles } from "../Auth/auth.constant"

const router = Router()

router.get("/",auth(Roles.admin),UserController.AllUsers)

router.put("/:userId",auth(Roles.admin,Roles.customer),UserController.SingleUserUpdate)

router.delete("/:userId",auth(Roles.admin),UserController.SingleUserDelete)



export const UserRouter = {
    router,
}