
import { Request,Response } from "express"

//[GET] localhost:3000/admin/upload
export const index = async (req: Request, res:Response) => {
    res.json({
        location: req.body.file
    })
  }