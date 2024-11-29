
import { Request,Response } from "express"

import Topics from "../../models/topics.model"


export const topics = async (req: Request, res:Response) => {
    const listTopics = await Topics.find({
      deleted: false
    })
    console.log(listTopics)
    res.render("client/pages/topics/index.pug",{
        pageTitle: "Trang chủ đề bài hát",
      listTopics
    })
  }