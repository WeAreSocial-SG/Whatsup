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
console.clear();
const createUpdate_1 = __importDefault(require("./createUpdate"));
const node_cron_1 = __importDefault(require("node-cron"));
const startServer_1 = __importDefault(require("./startServer"));
// setup cron job
const forceToCreateNewUpdate = true;
const scheduledTask = node_cron_1.default.schedule('0 0 * * 0', () => __awaiter(void 0, void 0, void 0, function* () { (0, createUpdate_1.default)(); }), { timezone: 'Asia/Singapore' });
if (forceToCreateNewUpdate) {
    (0, createUpdate_1.default)();
}
// start express server
const server = (0, startServer_1.default)();
