"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscriptions = exports.getCaptions = void 0;
const youtube_search_1 = __importDefault(require("youtube-search"));
const dotenv_1 = require("./dotenv");
const fs = __importStar(require("fs"));
const time_1 = require("./time");
const getSubtitles = require('youtube-captions-scraper').getSubtitles;
async function getLatestVideosFromChannel(channelId, num = 3) {
    const opts = {
        maxResults: num,
        key: dotenv_1.keys.googleCloud,
        channelId: channelId,
        order: 'date',
    };
    const results = await (0, youtube_search_1.default)('', opts);
    return results;
}
async function getCaptions(id) {
    const transcriptData = await getSubtitles({ videoID: id });
    let transcript = "";
    for (let index = 0; index < transcriptData.length; index++) {
        transcript += " " + transcriptData[index].text;
    }
    return transcript;
}
exports.getCaptions = getCaptions;
function getChannelIds() {
    const ids = [];
    // read file
    const rawString = fs.readFileSync('data/subscriptions.csv', 'utf-8');
    // extract ids
    rawString.split(/\r?\n/).forEach((line) => {
        ids.push(line.split(',')[1]);
    });
    return ids;
}
async function getSubscriptions() {
    // get channel ids you subscribe to
    const channelIds = getChannelIds();
    let latestVideosFromThisWeek = [];
    // for every channel get latest videos and only include videos in the past week
    for (let index = 0; index < channelIds.length; index++) {
        // get latest videos
        const id = channelIds[index];
        const videosFromChannel = await getLatestVideosFromChannel(id);
        // prune videos older than a week
        const videosFromThisWeek = videosFromChannel.results.filter((vidData) => {
            const date = vidData.publishedAt.split('T')[0];
            return !(0, time_1.isDateMoreThanAWeekOld)(date);
        });
        // save latest videos
        latestVideosFromThisWeek = [...latestVideosFromThisWeek, ...videosFromThisWeek];
    }
    return latestVideosFromThisWeek;
}
exports.getSubscriptions = getSubscriptions;
