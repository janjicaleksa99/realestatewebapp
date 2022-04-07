import express from 'express'
import Street from '../models/street'
import MicroLocation from '../models/microlocation'
import City from '../models/city'
import Municipality from '../models/municipality'
import street from '../models/street'


export class LocationController {
    getAll = (req : express.Request, res : express.Response) => {
        City.find({}, (err, cities) => {
            if (err) console.log(err)
            else {
                Municipality.find({}, (err, municipalities) => {
                    if (err) console.log(err)
                    else {
                        let data = {
                            'cities' : cities,
                            'municipalities' : municipalities
                        }
                        res.json(data);
                    }
                })
            }
        })
    }

    getAllStreets = (req : express.Request, res : express.Response) => {
        Street.find({}, (err, streets) => {
            if (err) console.log(err);
            else {
                res.json(streets);
            }
        })
    } 

    getAllMicroLocations = (req : express.Request, res : express.Response) => {
        MicroLocation.find({}, (err, microlocs) => {
            if (err) console.log(err);
            else {
                res.json(microlocs);
            }
        })
    }

    addLocation = (req : express.Request, res : express.Response) => {
        let microloc = req.body.microlocation;
        let streets = req.body.streets;

        console.log(req.body);

        MicroLocation.collection.insertOne({'name' : microloc.name, 'municipality' : microloc.municipality}, () => {
            let i = 0;
            for (i = 0; i < streets.length; i++) {
                Street.collection.insertOne(streets[i], () => {
                    if (i == streets.length - 1)
                        res.json({'message' : 'insert ok'});
                });
            }
            if (i == 0)
                res.json({'message' : 'insert ok'});
        })
    }
    
    deleteMicroLocation = (req : express.Request, res : express.Response) => {
        let microloc = req.query.microloc;
        console.log(microloc);

        MicroLocation.deleteOne({'name' : microloc}, () => {
            Street.deleteMany({'microlocation' : microloc}, () => {
                res.json({'message' : 'delete ok'});
            });
        });
    }

    getAllLinesForMicroLoc = (req : express.Request, res : express.Response) => {
        let microloc = req.query.microloc;

        let lines : any[] = [];
        Street.find({'microlocation' : microloc}, (err, streets : any[]) => {
            if (err) console.log(err);
            else {
                for (let i = 0; i < streets.length; i++) {
                    lines = lines.concat(streets[i].lines);
                }
                res.json(lines);
            }
        });
    }
}