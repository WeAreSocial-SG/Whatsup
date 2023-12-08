"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
const createUpdate_js_1 = __importDefault(require("./createUpdate.js"));
const node_cron_1 = __importDefault(require("node-cron"));
const startServer_js_1 = __importDefault(require("./startServer.js"));
// setup cron job
const forceToCreateNewUpdate = false;
const scheduledTask = node_cron_1.default.schedule('0 0 * * 0', async () => { (0, createUpdate_js_1.default)(); }, { timezone: 'Asia/Singapore' });
if (forceToCreateNewUpdate) {
    (0, createUpdate_js_1.default)();
}
// start express server
const server = (0, startServer_js_1.default)();
