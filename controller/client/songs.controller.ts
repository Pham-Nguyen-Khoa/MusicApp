import { Request, Response } from "express";

import Topics from "../../models/topics.model";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.mode";

//[GET] localhost:3000/songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const topic = await Topics.findOne({
    slug: req.params.slugTopic,
    deleted: false,
  });
  let songs = await Song.find({
    topicId: topic.id,
    deleted: "false",
    status: "active",
  }).select("avatar title slug singerId like ");
  for (let song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      deleted: false,
      status: "active",
    });
    song["infoSinger"] = infoSinger;
  }

  res.render("client/pages/songs/index.pug", {
    pageTitle: topic.title,
    songs: songs,
  });
};




//[GET] localhost:3000/songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slugSong = req.params.slugSong;
  const song = await Song.findOne({
    slug: slugSong,
    deleted: false,
    status:"active"
  })
  const singer = await Singer.findOne({
    _id: song.singerId,
    status: "active",
    deleted: false
  }).select("fullName")

  const topic = await Topics.findOne({
    _id: song.topicId,
    status: "active",
    deleted: false
  }).select("title")

  const favoriteSong = await FavoriteSong.findOne({
    songId: song.id
  })
  song["favoriteSong"] = favoriteSong;
  

  res.render("client/pages/songs/detail.pug", {
    pageTitle: "Trang chi tiet bai hat",
    song: song,
    singer: singer,
    topic: topic,

  });
};


//[GET] localhost:3000/songs/:typeLike/:songID
export const like = async (req: Request, res: Response) => {
 try {
    const typeLike:String = req.params.typeLike;
    const songID:String = req.params.songID;
    
    const song = await Song.findOne({
      _id: songID,
      status: "active",
      deleted: false
    });

    const newLike:Number = typeLike == "like" ? song.like + 1 : song.like -1 ;
    const message:String = typeLike == "like" ? "Like bài hát thành công" : "Bo like  bài hát thanh cong";
    await Song.updateOne({
      _id:songID,
      deleted: false,
      status: "active"
    },{
      like: newLike
    })
    res.json({
      code: 200,
      message: message,
      newLike: newLike
    })
    
 } catch (error) {
  res.json({
    code: 400,
    message: "Lỗi thích bài hát"
  })
 }
};


//[GET] localhost:3000/songs/favorite/:typeFavorite/:songID
export const favorite = async (req: Request, res: Response) => {
  try {
     const typeFavorite:String = req.params.typeFavorite;
     const songID:String = req.params.songID;
     switch(typeFavorite){
        case "favorite":{
          const checkSong = await Song.findOne({
            _id: songID,
            deleted:  false,
            status: "active"
          })
          const favoriteExisted = await FavoriteSong.findOne({
            songId: songID
          })
          if(!checkSong){
          res.json({
            code: 400,
            message: "Không có bài hát nào có id này"
          })
          return;
          }
          if(!favoriteExisted){
          const favorite = new FavoriteSong({
            songId: songID
          })
          await favorite.save()
          }
          res.json({
            code: 200,
            message: "Đã thêm bài hát vào danh sách yêu thích"
          })
          break;
        }
        case "unfavorite":{
          await FavoriteSong.deleteOne({
            songId: songID
          })
          res.json({
            code: 200,
            message: "Đã xóa bài hát khỏi danh sách yêu thích"
          })
          break;
        }
     }

  } catch (error) {
   res.json({
     code: 400,
     message: "Lỗi thêm  bài hát vào danh sách yêu thích"
   })
  }
 };
 
 

