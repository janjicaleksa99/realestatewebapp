import express from 'express'
import { LocationController } from '../controller/location.controller';


const locationRouter = express.Router();

locationRouter.route('/getAll').get(
    (req, res) => new LocationController().getAll(req, res)
);

locationRouter.route('/addLocation').post(
    (req, res) => new LocationController().addLocation(req, res)
);

locationRouter.route('/getAllMicroLocations').get(
    (req, res) => new LocationController().getAllMicroLocations(req, res)
);

locationRouter.route('/deleteMicroLocation').get(
    (req, res) => new LocationController().deleteMicroLocation(req, res)
);

locationRouter.route('/getAllStreets').get(
    (req, res) => new LocationController().getAllStreets(req, res)
);

locationRouter.route('/getAllLinesForMicroLoc').get(
    (req, res) => new LocationController().getAllLinesForMicroLoc(req, res)
);

export default locationRouter;