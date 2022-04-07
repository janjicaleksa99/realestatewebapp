import express from 'express'
import { AgencyController } from '../controller/agency.controller';


const agencyRouter = express.Router();

agencyRouter.route('/getAll').get(
    (req, res) => new AgencyController().getAll(req, res)
);

agencyRouter.route('/registerAgency').post(
    (req, res) => new AgencyController().registerAgency(req, res)
);

agencyRouter.route('/getUserAgency').post(
    (req, res) => new AgencyController().getUserAgency(req, res)
);

export default agencyRouter;