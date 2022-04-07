import express from 'express'
import Advertisement from '../models/advertisement'


export class AdvertisementController {
    search = (req : express.Request, res : express.Response) => {
        let searchCriteria = req.body;

        Advertisement.find(searchCriteria, (err, advertisements) => {
            if (err) console.log(err);
            else {
                res.json(advertisements);
            }
        });
    }

    getFavoriteAds = (req : express.Request, res : express.Response) => {
        let favoriteAds = req.body.favoriteAds;
        let length = req.body.length;
        let result : any[] = [];
        if (length == 0) {
            res.json(result);
        }
        for (let i = 0; i < length; i++) {
            Advertisement.findOne({'_id' : favoriteAds[i]}, (err, advertisement) => {
                if (err) console.log(err);
                else {
                    result.push(advertisement);
                    if (i == length - 1) {
                        res.json(result);
                    }
                }
            })
        }
    }

    getAll = (req : express.Request, res : express.Response) => {
        Advertisement.find({}, (err, adverts) => { 
            if (err) console.log(err);
            else {
                res.json(adverts);
            }
         });
    }

    getAllByDateDesc = (req : express.Request, res : express.Response) => {
        Advertisement.find({}).sort({'Realestate.PublishDate': 'descending'}).limit(5).exec((err, adverts) => { 
            if (err) console.log(err);
            else {
                res.json(adverts);
            }
         });
    }

    getAllForSalesMan = (req : express.Request, res : express.Response) => {
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let phone = req.body.phone;
        let type = req.body.type;

        if (type == 'prodavac') {
            Advertisement.find({'Advertiser.0.FirstName' : firstname, 'Advertiser.0.LastName' : lastname, 'Advertiser.0.Phone' : phone}, (err, adverts) => {
                if (err) console.log(err);
                else
                    res.json(adverts);
            });
        }
        else if (type == 'agent') {
            Advertisement.find({'Advertiser.1.FirstName' : firstname, 'Advertiser.1.LastName' : lastname, 'Advertiser.1.Phone' : phone}, (err, adverts) => {
                if (err) console.log(err);
                else
                    res.json(adverts);
            });
        }
    }

    sellRealestate = (req : express.Request, res : express.Response) => {
        let _id = req.body.id;
        console.log(req.body);
        console.log(_id);

        Advertisement.updateOne({'_id' : _id}, {'Realestate.Sold' : 'DA'}, (err, advertisement) => {
            if (err) console.log(err);
            else {
                console.log(advertisement)
            }
        })
    }

    addAdvert = (req : express.Request, res : express.Response) => {
        let ad = req.body.ad;

        Advertisement.collection.insertOne(ad, () => {
            res.json({'message' : 'insert ok'});
        })
    }

    updateAdvert = (req : express.Request, res : express.Response) => {
        let advert = req.body.advert._id;
        console.log(req.body.advert.LastEdited);
        Advertisement.updateOne({'_id' : advert}, req.body.advert, (err, advertisement) => {
            if (err) console.log(err);
            else {
                res.json({'message' : 'update ok'});
            }
        })
    } 
}