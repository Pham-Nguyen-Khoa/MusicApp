import { Request, Response } from "express";
import Song from "../../models/songs.model";
import Singer from "../../models/singer.model";
import Topics from "../../models/topics.model";
import { systemConfig } from "../../config/config";

//[GET] localhost:3000/admin/songs
export const song = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  }).sort({"updatedAt": "desc"});
  for (let song of songs) {
      const infoSinger = await Singer.findOne({
        _id: song.singerId,
        deleted: false,
      })
      
      const infoTopic = await Topics.findOne({
        _id: song.topicId,
        deleted: false,
      })

      song["infoSinger"] = infoSinger
      song["infoTopic"] = infoTopic
  }
  res.render("admin/pages/songs/index.pug", {
    pageTitle: " Quản lý bài hát",
    songs: songs,
  });
};




//[GET] localhost:3000/admin/songs/create
export const create = async (req: Request, res: Response) => {
  const topics = await Topics.find({
    deleted: false,
    status: "active"
  }).select("title")
  const singers = await Singer.find({
    deleted: false,
    status: "active"
  }).select("fullName")
  res.render("admin/pages/songs/create.pug", {
    pageTitle: "Tạo mới bài hát",
    topics,
    singers
  });
};


//[POST] localhost:3000/admin/songs/create
export const createPost = async (req: Request, res: Response) => {
  let avatar = ""
  if(req.body.avatar){
    avatar = req.body.avatar[0];
  }
  let audio = ""
  if(req.body.audio){
    audio = req.body.audio[0];
  }
    const dataSong = {
      title: req.body.title,
      topicId: req.body.topicId,
      singerId: req.body.singerId,
      description: req.body.desc,
      status: req.body.status,
      avatar: avatar,
      audio: audio,
      lyrics: req.body.lyrics
    }
    const song = new Song(dataSong);
    await song.save();
    res.redirect(`${systemConfig.prefixAdmin}/songs`);
};




//[GET] localhost:3000/admin/songs/edit/:id
export const edit = async (req: Request, res: Response) => {
  const songID: String = req.params.id;
  const song = await Song.findOne({
    _id: songID,
    deleted: false

  })
  const topics = await Topics.find({
    deleted: false,
  }).select("title")
  const singers = await Singer.find({
    deleted: false,
  }).select("fullName")
  res.render("admin/pages/songs/edit.pug", {
    pageTitle: "Chỉnh sửa bài hát",
    song: song,
    singers: singers,
    topics: topics

  });
};




//[PATCH] localhost:3000/admin/songs/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.desc,
    status: req.body.status,
    lyrics: req.body.lyrics
  }
  if(req.body.avatar){
    dataSong["avatar"] = req.body.avatar[0];
  }
  if(req.body.audio){
    dataSong["audio"] = req.body.audio[0];
  }
  await Song.updateOne({
    _id: req.params.id
  },dataSong)
  res.redirect("back")
};
