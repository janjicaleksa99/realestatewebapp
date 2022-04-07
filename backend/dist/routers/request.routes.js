"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const requestRouter = express_1.default.Router();
requestRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
exports.default = requestRouter;
//# sourceMappingURL=request.routes.js.map