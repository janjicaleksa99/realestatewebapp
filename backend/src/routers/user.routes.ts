import express from 'express'
import { UserController } from '../controller/user.controller';


const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
);

userRouter.route('/register').post(
    (req, res) => new UserController().register(req, res)
);

userRouter.route('/addAdForBuyer').post(
    (req, res) => new UserController().addAdForBuyer(req, res)
);

userRouter.route('/removeAdForBuyer').post(
    (req, res) => new UserController().removeAdForBuyer(req, res)
);

userRouter.route('/getAllForConfirmation').get(
    (req, res) => new UserController().getAllForConfirmation(req, res)
);

userRouter.route('/acceptUser').get(
    (req, res) => new UserController().acceptUser(req, res)
);

userRouter.route('/rejectUser').get(
    (req, res) => new UserController().rejectUser(req, res)
);

userRouter.route('/getAll').get(
    (req, res) => new UserController().getAll(req, res)
);

userRouter.route('/deleteUser').get(
    (req, res) => new UserController().deleteUser(req, res)
);

userRouter.route('/editUser').post(
    (req, res) => new UserController().editUser(req, res)
);

userRouter.route('/passwordChange').post(
    (req, res) => new UserController().passwordChange(req, res)
);

userRouter.route('/updateSalesman').post(
    (req, res) => new UserController().updateSalesman(req, res)
);

export default userRouter;