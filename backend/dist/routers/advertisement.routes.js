"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const advertisement_controller_1 = require("../controller/advertisement.controller");
const advertisementRouter = express_1.default.Router();
advertisementRouter.route('/search').post((req, res) => new advertisement_controller_1.AdvertisementController().search(req, res));
advertisementRouter.route('/getFavoriteAds').post((req, res) => new advertisement_controller_1.AdvertisementController().getFavoriteAds(req, res));
advertisementRouter.route('/getAllByDateDesc').get((req, res) => new advertisement_controller_1.AdvertisementController().getAllByDateDesc(req, res));
advertisementRouter.route('/getAllForSalesMan').post((req, res) => new advertisement_controller_1.AdvertisementController().getAllForSalesMan(req, res));
advertisementRouter.route('/sellRealestate').post((req, res) => new advertisement_controller_1.AdvertisementController().sellRealestate(req, res));
advertisementRouter.route('/addAdvert').post((req, res) => new advertisement_controller_1.AdvertisementController().addAdvert(req, res));
advertisementRouter.route('/updateAdvert').post((req, res) => new advertisement_controller_1.AdvertisementController().updateAdvert(req, res));
advertisementRouter.route('/getAll').get((req, res) => new advertisement_controller_1.AdvertisementController().getAll(req, res));
exports.default = advertisementRouter;
//# sourceMappingURL=advertisement.routes.js.map