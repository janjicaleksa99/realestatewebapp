"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/addAdForBuyer').post((req, res) => new user_controller_1.UserController().addAdForBuyer(req, res));
userRouter.route('/removeAdForBuyer').post((req, res) => new user_controller_1.UserController().removeAdForBuyer(req, res));
userRouter.route('/getAllForConfirmation').get((req, res) => new user_controller_1.UserController().getAllForConfirmation(req, res));
userRouter.route('/acceptUser').get((req, res) => new user_controller_1.UserController().acceptUser(req, res));
userRouter.route('/rejectUser').get((req, res) => new user_controller_1.UserController().rejectUser(req, res));
userRouter.route('/getAll').get((req, res) => new user_controller_1.UserController().getAll(req, res));
userRouter.route('/deleteUser').get((req, res) => new user_controller_1.UserController().deleteUser(req, res));
userRouter.route('/editUser').post((req, res) => new user_controller_1.UserController().editUser(req, res));
userRouter.route('/passwordChange').post((req, res) => new user_controller_1.UserController().passwordChange(req, res));
userRouter.route('/updateSalesman').post((req, res) => new user_controller_1.UserController().updateSalesman(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map