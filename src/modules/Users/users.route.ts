import { Router } from "express"
import { UserController } from "./user.controller"

const router = Router()

router.get("/",UserController.AllUsers)

router.put("/:userId",UserController.SingleUserUpdate)

router.delete("/:userId",UserController.SingleUserDelete)



export const UserRouter = {
    router,
}