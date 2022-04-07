import express from 'express'
import Agency from '../models/agency'


export class AgencyController {
    getAll = (req : express.Request, res : express.Response) => {
        Agency.find({}, (err, agencies) => {
            if (err) console.log(err);
            else {
                res.json(agencies);
            }
        });
    }

    registerAgency = (req : express.Request, res : express.Response) => {
        console.log(req.body);
        Agency.collection.insertOne(req.body, () => {
            res.json({'message' : 'insert ok'});
        });
    }

    getUserAgency = (req : express.Request, res : express.Response) => {
        let name = req.body.name;

        Agency.findOne({'name' : name}, (err, agencies) => {
            if (err) console.log(err);
            else {
                res.json(agencies);
            }
        });
    }
}