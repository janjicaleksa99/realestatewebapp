"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestController = void 0;
const user_1 = __importDefault(require("../models/user"));
const request_1 = __importDefault(require("../models/request"));
class RequestController {
    constructor() {
        this.registerRequest = (req, res) => {
            let newUser = req.body.user;
            user_1.default.findOne({ 'username': newUser.username }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        res.json({ 'message': 'user already exists' });
                    }
                    else {
                        request_1.default.collection.insertOne(newUser, (err) => {
                            if (err)
                                console.log(err);
                            else {
                                res.json({ 'message': 'insert ok' });
                            }
                        });
                    }
                }
            });
        };
    }
}
exports.RequestController = RequestController;
//# sourceMappingURL=request.controller.js.map