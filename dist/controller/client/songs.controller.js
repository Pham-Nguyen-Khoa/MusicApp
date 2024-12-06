"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topics_model_1 = __importDefault(require("../../models/topics.model"));
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_song_mode_1 = __importDefault(require("../../models/favorite-song.mode"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topics_model_1.default.findOne({
        slug: req.params.slugTopic,
        deleted: false,
    });
    let songs = yield songs_model_1.default.find({
        topicId: topic.id,
        deleted: "false",
        status: "active",
    }).select("avatar title slug singerId like lyrics ");
    for (let song of songs) {
        const infoSinger = yield singer_model_1.default.findOne({
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
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const song = yield songs_model_1.default.findOne({
        slug: slugSong,
        deleted: false,
        status: "active"
    });
    const singer = yield singer_model_1.default.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false
    }).select("fullName");
    const topic = yield topics_model_1.default.findOne({
        _id: song.topicId,
        status: "active",
        deleted: false
    }).select("title");
    const favoriteSong = yield favorite_song_mode_1.default.findOne({
        songId: song.id
    });
    song["favoriteSong"] = favoriteSong;
    res.render("client/pages/songs/detail.pug", {
        pageTitle: "Trang chi tiet bai hat",
        song: song,
        singer: singer,
        topic: topic,
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeLike = req.params.typeLike;
        const songID = req.params.songID;
        const song = yield songs_model_1.default.findOne({
            _id: songID,
            status: "active",
            deleted: false
        });
        const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
        const message = typeLike == "like" ? "Like bài hát thành công" : "Bo like  bài hát thanh cong";
        yield songs_model_1.default.updateOne({
            _id: songID,
            deleted: false,
            status: "active"
        }, {
            like: newLike
        });
        res.json({
            code: 200,
            message: message,
            newLike: newLike
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi thích bài hát"
        });
    }
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typeFavorite = req.params.typeFavorite;
        const songID = req.params.songID;
        switch (typeFavorite) {
            case "favorite": {
                const checkSong = yield songs_model_1.default.findOne({
                    _id: songID,
                    deleted: false,
                    status: "active"
                });
                const favoriteExisted = yield favorite_song_mode_1.default.findOne({
                    songId: songID
                });
                if (!checkSong) {
                    res.json({
                        code: 400,
                        message: "Không có bài hát nào có id này"
                    });
                    return;
                }
                if (!favoriteExisted) {
                    const favorite = new favorite_song_mode_1.default({
                        songId: songID
                    });
                    yield favorite.save();
                }
                res.json({
                    code: 200,
                    message: "Đã thêm bài hát vào danh sách yêu thích"
                });
                break;
            }
            case "unfavorite": {
                yield favorite_song_mode_1.default.deleteOne({
                    songId: songID
                });
                res.json({
                    code: 200,
                    message: "Đã xóa bài hát khỏi danh sách yêu thích"
                });
                break;
            }
        }
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi thêm  bài hát vào danh sách yêu thích"
        });
    }
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songID = req.params.songID;
        const song = yield songs_model_1.default.findOne({
            _id: songID,
            deleted: false,
            status: "active"
        });
        const newListen = song.listen + 1;
        yield songs_model_1.default.updateOne({
            _id: songID
        }, {
            listen: newListen
        });
        const newSong = yield songs_model_1.default.findOne({
            _id: songID,
            deleted: false,
            status: "active"
        });
        res.json({
            code: 200,
            message: "Thành công",
            listen: newSong.listen
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi thích bài hát"
        });
    }
});
exports.listen = listen;
