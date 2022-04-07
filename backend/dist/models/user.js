"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
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
    status: {
        type: String
    },
    favoriteAds: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('User', User, 'korisnik');
//# sourceMappingURL=user.js.map