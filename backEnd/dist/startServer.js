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
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const cors_1 = __importDefault(require("cors"));
function startServer() {
    const app = (0, express_1.default)();
    const PORT = 3000;
    // add cors server
    app.use((0, cors_1.default)({
        origin: "*",
    }));
    // Define an endpoint to read current update
    app.get('/currentUpdate', (req, res) => {
        try {
            // Read the JSON file synchronously
            const data = fs.readFileSync('data/currentData.json', 'utf8');
            const jsonData = JSON.parse(data);
            res.json(jsonData); // Return the JSON data as a response
        }
        catch (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Failed to read file' }); // Send an error response if file reading fails
        }
    });
    // todo create endpoint to read previous updates
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    // retun
    return app;
}
exports.default = startServer;
