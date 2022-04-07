"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password, 'status': 'prihvacen' }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    res.json(user);
                }
            });
        };
        this.register = (req, res) => {
            let newUser = req.body.user;
            let message = '';
            user_1.default.findOne({ 'username': newUser.username }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        message += 'usernameExists';
                        user_1.default.findOne({ 'email': newUser.email }, (err, user) => {
                            if (err)
                                console.log(err);
                            else {
                                if (user) {
                                    message += 'emailExists';
                                }
                                res.json({ 'message': message });
                            }
                        });
                    }
                    else {
                        user_1.default.findOne({ 'email': newUser.email }, (err, user) => {
                            if (user == null) {
                                user_1.default.collection.insertOne(newUser, (err) => {
                                    if (err)
                                        console.log(err);
                                    else {
                                        res.json({ 'message': 'insert ok' });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        };
        this.addAdForBuyer = (req, res) => {
            let username = req.body.username;
            let adID = req.body.adID;
            user_1.default.updateOne({ 'username': username }, { $push: { 'favoriteAds': adID } }, () => {
                res.json({ 'message': 'ok' });
            });
        };
        this.removeAdForBuyer = (req, res) => {
            let username = req.body.username;
            let adID = req.body.adID;
            user_1.default.updateOne({ 'username': username }, { $pull: { 'favoriteAds': adID } }, () => {
                res.json({ 'message': 'ok' });
            });
        };
        this.getAllForConfirmation = (req, res) => {
            user_1.default.find({ 'status': 'novi' }, (err, users) => {
                if (err)
                    console.log(err);
                else {
                    res.json(users);
                }
            });
        };
        this.getAll = (req, res) => {
            user_1.default.find({ 'status': { '$ne': 'novi' }, 'type': { '$ne': 'admin' } }, (err, users) => {
                if (err)
                    console.log(err);
                else {
                    res.json(users);
                }
            });
        };
        this.acceptUser = (req, res) => {
            let username = req.query.username;
            user_1.default.updateOne({ 'username': username }, { $set: { 'status': 'prihvacen' } }, () => {
                res.json({ 'message': 'update ok' });
            });
        };
        this.rejectUser = (req, res) => {
            let username = req.query.username;
            user_1.default.updateOne({ 'username': username }, { $set: { 'status': 'odbijen' } }, () => {
                res.json({ 'message': 'update ok' });
            });
        };
        this.deleteUser = (req, res) => {
            let username = req.query.username;
            user_1.default.deleteOne({ 'username': username }, () => {
                res.json({ 'message': 'delete ok' });
            });
        };
        this.editUser = (req, res) => {
            let data = req.body;
            user_1.default.updateOne({ 'username': data.username }, { $set: data }, () => {
                res.json({ 'message': 'update ok' });
            });
        };
        this.passwordChange = (req, res) => {
            let username = req.body.username;
            let oldPassword = req.body.oldPassword;
            let newPassword = req.body.newPassword;
            user_1.default.findOne({ 'username': username, 'password': oldPassword }, (err, user) => {
                if (user == null) {
                    res.json({ 'message': 'wrong old password' });
                }
                else {
                    user_1.default.updateOne({ 'username': username, 'password': oldPassword }, { 'password': newPassword }, () => {
                        res.json({ 'message': 'password change ok' });
                    });
                }
            });
        };
        this.updateSalesman = (req, res) => {
            let salesman = req.body.salesman;
            user_1.default.findOne({ 'username': { '$ne': salesman.username }, 'email': salesman.email }, (err, user) => {
                if (user) {
                    res.json({ 'message': 'emailAlreadyExists' });
                }
                else {
                    user_1.default.updateOne({ 'username': salesman.username }, salesman, () => {
                        res.json({ 'message': 'update ok' });
                    });
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map