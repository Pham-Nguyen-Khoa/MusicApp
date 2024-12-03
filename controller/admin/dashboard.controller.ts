
import { Request,Response } from "express"

//[GET] localhost:3000/admin/dashboard
export const dashboard = async (req: Request, res:Response) => {
    
    res.render("admin/pages/dashboard/dashboard.pug",{
        pageTitle: "Trang dashboard Admin"
    })
  }