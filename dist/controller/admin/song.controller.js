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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.song = void 0;
const songs_model_1 = __importDefault(require("../../models/songs.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const topics_model_1 = __importDefault(require("../../models/topics.model"));
const config_1 = require("../../config/config");
const song = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield songs_model_1.default.find({
        deleted: false,
    }).sort({ "updatedAt": "desc" });
    for (let song of songs) {
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false,
        });
        const infoTopic = yield topics_model_1.default.findOne({
            _id: song.topicId,
            deleted: false,
        });
        song["infoSinger"] = infoSinger;
        song["infoTopic"] = infoTopic;
    }
    res.render("admin/pages/songs/index.pug", {
        pageTitle: " Quản lý bài hát",
        songs: songs,
    });
});
exports.song = song;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topics_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("fullName");
    res.render("admin/pages/songs/create.pug", {
        pageTitle: "Tạo mới bài hát",
        topics,
        singers
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    let audio = "";
    if (req.body.audio) {
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
    };
    const song = new songs_model_1.default(dataSong);
    yield song.save();
    res.redirect(`${config_1.systemConfig.prefixAdmin}/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songID = req.params.id;
    const song = yield songs_model_1.default.findOne({
        _id: songID,
        deleted: false
    });
    const topics = yield topics_model_1.default.find({
        deleted: false,
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
    }).select("fullName");
    res.render("admin/pages/songs/edit.pug", {
        pageTitle: "Chỉnh sửa bài hát",
        song: song,
        singers: singers,
        topics: topics
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.desc,
        status: req.body.status,
        lyrics: req.body.lyrics
    };
    if (req.body.avatar) {
        dataSong["avatar"] = req.body.avatar[0];
    }
    if (req.body.audio) {
        dataSong["audio"] = req.body.audio[0];
    }
    yield songs_model_1.default.updateOne({
        _id: req.params.id
    }, dataSong);
    res.redirect("back");
});
exports.editPatch = editPatch;
