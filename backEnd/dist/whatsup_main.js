"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
const startServer_1 = __importDefault(require("./startServer"));
// setup cron job
// const scheduledTask = cron.schedule(
//     '0 0 * * 0',
//     async () => { createUpdate() },
//     { timezone: 'Asia/Singapore' }
// );
// createUpdate();
// start express server
const server = (0, startServer_1.default)();
