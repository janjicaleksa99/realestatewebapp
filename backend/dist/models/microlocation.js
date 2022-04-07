"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let MicroLocation = new Schema({
    name: {
        type: String
    },
    municipality: {
        type: String
    }
});
exports.default = mongoose_1.default.model('MicroLocation', MicroLocation, 'mikrolokacija');
//# sourceMappingURL=microlocation.js.map