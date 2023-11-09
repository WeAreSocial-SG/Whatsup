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
const gpt_1 = __importDefault(require("./gpt"));
const youtube_1 = require("./youtube");
function createUpdate() {
    return __awaiter(this, void 0, void 0, function* () {
        const dataToWrite = {};
        // get subs
        const subs = yield (0, youtube_1.getSubscriptions)();
        // get captions, summarise them and input data to write
        for (let index = 0; index < subs.length; index++) {
            const vid = subs[index];
            const cap = yield (0, youtube_1.getCaptions)(vid.id);
            const summary = yield (0, gpt_1.default)(cap);
            dataToWrite[vid.title] = {
                id: vid.id,
                title: vid.title,
                summary: summary
            };
        }
        // write data to disk
        console.log(dataToWrite);
    });
}
exports.default = createUpdate;
