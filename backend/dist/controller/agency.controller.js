"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyController = void 0;
const agency_1 = __importDefault(require("../models/agency"));
class AgencyController {
    constructor() {
        this.getAll = (req, res) => {
            agency_1.default.find({}, (err, agencies) => {
                if (err)
                    console.log(err);
                else {
                    res.json(agencies);
                }
            });
        };
        this.registerAgency = (req, res) => {
            console.log(req.body);
            agency_1.default.collection.insertOne(req.body, () => {
                res.json({ 'message': 'insert ok' });
            });
        };
        this.getUserAgency = (req, res) => {
            let name = req.body.name;
            agency_1.default.findOne({ 'name': name }, (err, agencies) => {
                if (err)
                    console.log(err);
                else {
                    res.json(agencies);
                }
            });
        };
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map