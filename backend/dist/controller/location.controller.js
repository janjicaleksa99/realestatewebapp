"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationController = void 0;
const street_1 = __importDefault(require("../models/street"));
const microlocation_1 = __importDefault(require("../models/microlocation"));
const city_1 = __importDefault(require("../models/city"));
const municipality_1 = __importDefault(require("../models/municipality"));
class LocationController {
    constructor() {
        this.getAll = (req, res) => {
            city_1.default.find({}, (err, cities) => {
                if (err)
                    console.log(err);
                else {
                    municipality_1.default.find({}, (err, municipalities) => {
                        if (err)
                            console.log(err);
                        else {
                            let data = {
                                'cities': cities,
                                'municipalities': municipalities
                            };
                            res.json(data);
                        }
                    });
                }
            });
        };
        this.getAllStreets = (req, res) => {
            street_1.default.find({}, (err, streets) => {
                if (err)
                    console.log(err);
                else {
                    res.json(streets);
                }
            });
        };
        this.getAllMicroLocations = (req, res) => {
            microlocation_1.default.find({}, (err, microlocs) => {
                if (err)
                    console.log(err);
                else {
                    res.json(microlocs);
                }
            });
        };
        this.addLocation = (req, res) => {
            let microloc = req.body.microlocation;
            let streets = req.body.streets;
            console.log(req.body);
            microlocation_1.default.collection.insertOne({ 'name': microloc.name, 'municipality': microloc.municipality }, () => {
                let i = 0;
                for (i = 0; i < streets.length; i++) {
                    street_1.default.collection.insertOne(streets[i], () => {
                        if (i == streets.length - 1)
                            res.json({ 'message': 'insert ok' });
                    });
                }
                if (i == 0)
                    res.json({ 'message': 'insert ok' });
            });
        };
        this.deleteMicroLocation = (req, res) => {
            let microloc = req.query.microloc;
            console.log(microloc);
            microlocation_1.default.deleteOne({ 'name': microloc }, () => {
                street_1.default.deleteMany({ 'microlocation': microloc }, () => {
                    res.json({ 'message': 'delete ok' });
                });
            });
        };
        this.getAllLinesForMicroLoc = (req, res) => {
            let microloc = req.query.microloc;
            let lines = [];
            street_1.default.find({ 'microlocation': microloc }, (err, streets) => {
                if (err)
                    console.log(err);
                else {
                    for (let i = 0; i < streets.length; i++) {
                        lines = lines.concat(streets[i].lines);
                    }
                    res.json(lines);
                }
            });
        };
    }
}
exports.LocationController = LocationController;
//# sourceMappingURL=location.controller.js.map