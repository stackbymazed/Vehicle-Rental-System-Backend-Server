import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const SignUpUser = async (req: Request, res: Response) => {
    const data = req.body;
    // console.log(data);
    try {
        const result = await AuthService.SignUpUser(data);
        // console.log(result);
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const SignInUser = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const result = await AuthService.SignInUser(data);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        })

    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

export const AuthController = {
    SignUpUser,
    SignInUser,
}