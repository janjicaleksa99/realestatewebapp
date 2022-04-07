"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let RealEstate = new Schema({
    Name: {
        type: String
    },
    Type: {
        type: String
    },
    City: {
        type: String
    },
    Municipality: {
        type: String
    },
    Microlocation: {
        type: String
    },
    Street: {
        type: String
    },
    Lines: {
        type: Array
    },
    Area: {
        type: Number
    },
    Rooms: {
        type: Number
    },
    ConstructionYear: {
        type: Number
    },
    PublishDate: {
        type: Date
    },
    State: {
        type: String
    },
    Heating: {
        type: String
    },
    Floor: {
        type: Number
    },
    TotalFloors: {
        type: Number
    },
    Parking: {
        type: String
    },
    MonthlyUtilities: {
        type: Number
    },
    Price: {
        type: Number
    },
    About: {
        type: String
    },
    Characteristics: {
        type: Array
    },
    Sold: {
        type: String
    },
    Pictures: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('RealEstate', RealEstate, 'nekretnina');
//# sourceMappingURL=real_estate.js.map