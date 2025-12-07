import { Request, Response } from "express";

const SignUpUser = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const result = await 
        res.status(200).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const AuthRouter = {
    SignUpUser,
}