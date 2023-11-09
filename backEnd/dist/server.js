"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
function startServer() {
    // setup server
    const app = (0, express_1.default)();
    const port = 3000;
    app.use(body_parser_1.default.json());
    // handle main hook
    app.get('/update', (req, res) => {
        // get payload though rn the payload does nothing
        // const payload = req.body;
        try {
            // return the current update file
            res.json({});
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ message: 'i fucked up somehow... aim soweee' });
        }
    });
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    return app;
}
exports.default = startServer;
