import { Router } from "express"
import { AuthController } from "./auth.controller"

const router = Router()

router.post("/",AuthController.SignUpUser)



export const AuthRouter = {
    router,
}