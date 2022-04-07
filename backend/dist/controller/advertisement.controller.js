"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertisementController = void 0;
const advertisement_1 = __importDefault(require("../models/advertisement"));
class AdvertisementController {
    constructor() {
        this.search = (req, res) => {
            let searchCriteria = req.body;
            advertisement_1.default.find(searchCriteria, (err, advertisements) => {
                if (err)
                    console.log(err);
                else {
                    res.json(advertisements);
                }
            });
        };
        this.getFavoriteAds = (req, res) => {
            let favoriteAds = req.body.favoriteAds;
            let length = req.body.length;
            let result = [];
            if (length == 0) {
                res.json(result);
            }
            for (let i = 0; i < length; i++) {
                advertisement_1.default.findOne({ '_id': favoriteAds[i] }, (err, advertisement) => {
                    if (err)
                        console.log(err);
                    else {
                        result.push(advertisement);
                        if (i == length - 1) {
                            res.json(result);
                        }
                    }
                });
            }
        };
        this.getAll = (req, res) => {
            advertisement_1.default.find({}, (err, adverts) => {
                if (err)
                    console.log(err);
                else {
                    res.json(adverts);
                }
            });
        };
        this.getAllByDateDesc = (req, res) => {
            advertisement_1.default.find({}).sort({ 'Realestate.PublishDate': 'descending' }).limit(5).exec((err, adverts) => {
                if (err)
                    console.log(err);
                else {
                    res.json(adverts);
                }
            });
        };
        this.getAllForSalesMan = (req, res) => {
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let phone = req.body.phone;
            let type = req.body.type;
            if (type == 'prodavac') {
                advertisement_1.default.find({ 'Advertiser.0.FirstName': firstname, 'Advertiser.0.LastName': lastname, 'Advertiser.0.Phone': phone }, (err, adverts) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(adverts);
                });
            }
            else if (type == 'agent') {
                advertisement_1.default.find({ 'Advertiser.1.FirstName': firstname, 'Advertiser.1.LastName': lastname, 'Advertiser.1.Phone': phone }, (err, adverts) => {
                    if (err)
                        console.log(err);
                    else
                        res.json(adverts);
                });
            }
        };
        this.sellRealestate = (req, res) => {
            let _id = req.body.id;
            console.log(req.body);
            console.log(_id);
            advertisement_1.default.updateOne({ '_id': _id }, { 'Realestate.Sold': 'DA' }, (err, advertisement) => {
                if (err)
                    console.log(err);
                else {
                    console.log(advertisement);
                }
            });
        };
        this.addAdvert = (req, res) => {
            let ad = req.body.ad;
            advertisement_1.default.collection.insertOne(ad, () => {
                res.json({ 'message': 'insert ok' });
            });
        };
        this.updateAdvert = (req, res) => {
            let advert = req.body.advert._id;
            console.log(req.body.advert.LastEdited);
            advertisement_1.default.updateOne({ '_id': advert }, req.body.advert, (err, advertisement) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'message': 'update ok' });
                }
            });
        };
    }
}
exports.AdvertisementController = AdvertisementController;
//# sourceMappingURL=advertisement.controller.js.map