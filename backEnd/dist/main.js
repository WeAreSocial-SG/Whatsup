"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
const createUpdate_1 = __importDefault(require("./createUpdate"));
const node_cron_1 = __importDefault(require("node-cron"));
const startServer_1 = __importDefault(require("./startServer"));
// setup cron job
const scheduledTask = node_cron_1.default.schedule('0 0 * * 0', async () => { (0, createUpdate_1.default)(); }, { timezone: 'Asia/Singapore' });
// start express server
const server = (0, startServer_1.default)();
