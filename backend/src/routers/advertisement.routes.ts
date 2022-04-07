import express from 'express'
import { AdvertisementController } from '../controller/advertisement.controller';


const advertisementRouter = express.Router();

advertisementRouter.route('/search').post(
    (req, res) => new AdvertisementController().search(req, res)
);

advertisementRouter.route('/getFavoriteAds').post(
    (req, res) => new AdvertisementController().getFavoriteAds(req, res)
);

advertisementRouter.route('/getAllByDateDesc').get(
    (req, res) => new AdvertisementController().getAllByDateDesc(req, res)
);

advertisementRouter.route('/getAllForSalesMan').post(
    (req, res) => new AdvertisementController().getAllForSalesMan(req, res)
);

advertisementRouter.route('/sellRealestate').post(
    (req, res) => new AdvertisementController().sellRealestate(req, res)
);

advertisementRouter.route('/addAdvert').post(
    (req, res) => new AdvertisementController().addAdvert(req, res)
);

advertisementRouter.route('/updateAdvert').post(
    (req, res) => new AdvertisementController().updateAdvert(req, res)
);

advertisementRouter.route('/getAll').get(
    (req, res) => new AdvertisementController().getAll(req, res)
);

export default advertisementRouter;