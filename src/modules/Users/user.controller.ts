import { Request, Response } from "express";
import { UserService } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

const AllUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserService.AllUserService();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        })

    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const SingleUserUpdate = async (req: Request, res: Response) => {
        const user = req.user
    try {
        const result = await UserService.SingleUserUpdateService(req.body,req.params.userId!,user as JwtPayload);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result
        })

    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const SingleUserDelete = async (req: Request, res: Response) => {
    try {
        const result = await UserService.SingleUserDeleteService(req.params.userId!);
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })

    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

export const UserController = {
    AllUsers,
    SingleUserUpdate,
    SingleUserDelete,
}