"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_router_1 = require("./topic.router");
const songs_router_1 = require("./songs.router");
const favorite_songs_router_1 = require("./favorite-songs.router");
const search_router_1 = require("./search.router");
const indexRouter = (app) => {
    app.use("/topics", topic_router_1.topicRouter);
    app.use("/songs", songs_router_1.songsRouter);
    app.use("/favorite-songs", favorite_songs_router_1.favoriteSongRouter);
    app.use("/search", search_router_1.searchRouter);
};
exports.default = indexRouter;
