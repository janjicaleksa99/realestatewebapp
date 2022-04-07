"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Request = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    city: {
        type: String
    },
    birthDate: {
        type: String // Mozda treba promeniti u Date
    },
    contact: {
        type: String
    },
    email: {
        type: String
    },
    agency: {
        type: String
    },
    licenseNum: {
        type: String
    },
    profileImage: {
        type: String
    },
    accepted: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('Request', Request, 'zahtev');
//# sourceMappingURL=request.js.map