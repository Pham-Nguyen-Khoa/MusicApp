
import { Request,Response } from "express"
import Topics from "../../models/topics.model"

//[GET] localhost:3000/admin/topics
export const topics = async (req: Request, res:Response) => {
    const topics = await Topics.find({
        deleted: false,
        status: "active"
    })
\    res.render("admin/pages/topic/index.pug",{
        pageTitle: " Quản lý chủ đề ",
        topics: topics
    })
  }