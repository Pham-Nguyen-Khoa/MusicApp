
import { Request,Response } from "express"

import Topics from "../../models/topics.model"

//[GET] localhost:3000/topics
export const topics = async (req: Request, res:Response) => {
    const topics = await Topics.find({
      deleted: false
    })
    res.render("client/pages/topics/index.pug",{
        pageTitle: "Trang chủ đề bài hát",
        topics: topics
    })
  }