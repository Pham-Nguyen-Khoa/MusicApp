
import { Request,Response } from "express"
import FavoriteSong from "../../models/favorite-song.mode"
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";


//[GET] localhost:3000/favorite-songs
export const index = async (req: Request, res:Response) => {
    const favoriteSongs = await FavoriteSong.find();
    for (const item of favoriteSongs) {
        const infoSong = await Song.findOne({
            _id: item.songId,
            deleted: false,
            status: "active"
        }).select("title avatar description slug singerId");
        const infoSinger = await Singer.findOne({
            _id: infoSong.singerId
        })
        item["infoSong"] = infoSong;
        item["infoSinger"] = infoSinger;
    }
    res.render("client/pages/favorite-songs/favorite.pug",{
        pageTitle: "Trang  bài hát yêu thích",
        favoriteSongs: favoriteSongs
        
    })
  }