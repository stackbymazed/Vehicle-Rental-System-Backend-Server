import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const result = await UserService.CrateUser(data);
        res.status(200).json({
            "success": true,
            "message": "Users retrieved successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

export const UserController = {
    createUser
}