"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agency_controller_1 = require("../controller/agency.controller");
const agencyRouter = express_1.default.Router();
agencyRouter.route('/getAll').get((req, res) => new agency_controller_1.AgencyController().getAll(req, res));
agencyRouter.route('/registerAgency').post((req, res) => new agency_controller_1.AgencyController().registerAgency(req, res));
agencyRouter.route('/getUserAgency').post((req, res) => new agency_controller_1.AgencyController().getUserAgency(req, res));
exports.default = agencyRouter;
//# sourceMappingURL=agency.routes.js.map