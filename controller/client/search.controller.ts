
import { Request,Response } from "express"
import FavoriteSong from "../../models/favorite-song.mode"
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";


//[GET] localhost:3000/search/result?keyword=
export const search = async (req: Request, res:Response) => {
    const keyword: string = `${req.query.keyword}`;
    let newSong = [];
  
        const keywordRegex = new RegExp(keyword,"i");
        // Tạo ra slug ko dấu có thêm dấu - ngăn cách
        const stringSlug = convertToSlug(keyword);
        const stringSlugRegex = new RegExp(stringSlug.toString(),"i");
        const songs = await Song.find(keyword ? {
            $or: [
                {title: keywordRegex },
                {slug: stringSlugRegex}
            ]
        }: {})
        for (const song of songs) {
            const infoSinger = await Singer.findOne({
                _id: song.singerId
            })
            song["infoSinger"] = infoSinger
        }
           
        newSong = songs
    

    res.render("client/pages/search/result.pug",{
        pageTitle: `Ket qua ${keyword}`,
        keyword: keyword,
        songs: newSong
        
    })
  }