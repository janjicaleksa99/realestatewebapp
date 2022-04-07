"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_controller_1 = require("../controller/location.controller");
const locationRouter = express_1.default.Router();
locationRouter.route('/getAll').get((req, res) => new location_controller_1.LocationController().getAll(req, res));
locationRouter.route('/addLocation').post((req, res) => new location_controller_1.LocationController().addLocation(req, res));
locationRouter.route('/getAllMicroLocations').get((req, res) => new location_controller_1.LocationController().getAllMicroLocations(req, res));
locationRouter.route('/deleteMicroLocation').get((req, res) => new location_controller_1.LocationController().deleteMicroLocation(req, res));
locationRouter.route('/getAllStreets').get((req, res) => new location_controller_1.LocationController().getAllStreets(req, res));
locationRouter.route('/getAllLinesForMicroLoc').get((req, res) => new location_controller_1.LocationController().getAllLinesForMicroLoc(req, res));
exports.default = locationRouter;
//# sourceMappingURL=location.routes.js.map