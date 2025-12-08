import { Router } from "express"
import { UserController } from "./user.controller"
import auth from "../../middleware/auth"

const router = Router()

router.get("/",auth(),UserController.AllUsers)

router.put("/:userId",UserController.SingleUserUpdate)

router.delete("/:userId",UserController.SingleUserDelete)



export const UserRouter = {
    router,
}