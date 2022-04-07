"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Advertisement = new Schema({
    _id: {
        type: mongoose_1.default.SchemaTypes.ObjectId
    },
    Realestate: {
        type: Object
    },
    Advertiser: {
        type: Array
    },
    LastEdited: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Advertisement', Advertisement, 'oglas');
//# sourceMappingURL=advertisement.js.map