import express from 'express'
import User from '../models/user'


export class UserController {
    login = (req : express.Request, res : express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        
        User.findOne({'username' : username, 'password' : password, 'status' : 'prihvacen'}, (err, user) => {
            if (err) console.log(err);
            else {
                res.json(user);
            }
        });
    }

    register = (req : express.Request, res : express.Response) => {
        let newUser = req.body.user;
        let message = '';

        User.findOne({'username' : newUser.username}, (err, user) => {
            if (err) console.log(err);
            else {
                if (user) {
                    message += 'usernameExists';
                    User.findOne({'email' : newUser.email}, (err, user) => {
                        if (err) console.log(err);
                        else {
                            if (user) {
                                message += 'emailExists';
                            }
                            res.json({'message' : message});
                        }
                    });
                }
                else {
                    User.findOne({'email' : newUser.email}, (err, user) => {
                        if (user == null) {
                            User.collection.insertOne(newUser, (err) => {
                                if (err) console.log(err)
                                else {
                                    res.json({'message' : 'insert ok'});
                                }
                            });
                        }
                    });
                }
            }
        });
    }

    addAdForBuyer = (req : express.Request, res : express.Response) => {
        let username = req.body.username;
        let adID = req.body.adID;
        
        User.updateOne({'username' : username}, {$push : {'favoriteAds' : adID}}, () => {
            res.json({'message' : 'ok'});
        });
    }

    removeAdForBuyer = (req : express.Request, res : express.Response) => {
        let username = req.body.username;
        let adID = req.body.adID;
        
        User.updateOne({'username' : username}, { $pull: { 'favoriteAds': adID}}, () => {
            res.json({'message' : 'ok'});
        });
    }

    getAllForConfirmation = (req : express.Request, res : express.Response) => {
        User.find({'status' : 'novi'}, (err, users : any[]) => {
            if (err) console.log(err);
            else {
                res.json(users);
            }
        });
    }

    getAll = (req : express.Request, res : express.Response) => {
        User.find({'status' : {'$ne' : 'novi'}, 'type' : {'$ne' : 'admin'}}
            , (err, users : any[]) => {
            if (err) console.log(err);
            else {
                res.json(users);
            }
        });
    }

    acceptUser = (req : express.Request, res : express.Response) => {
        let username = req.query.username;
        User.updateOne({'username' : username}, {$set : {'status' : 'prihvacen'}}, () => {
            res.json({'message' : 'update ok'})
        });
    }

    rejectUser = (req : express.Request, res : express.Response) => {
        let username = req.query.username;
        User.updateOne({'username' : username}, {$set : {'status' : 'odbijen'}}, () => {
            res.json({'message' : 'update ok'})
        });
    }

    deleteUser = (req : express.Request, res : express.Response) => {
        let username = req.query.username;
        User.deleteOne({'username' : username}, () => {
            res.json({'message' : 'delete ok'})
        });
    }

    editUser = (req : express.Request, res : express.Response) => {
        let data = req.body;

        User.updateOne({'username' : data.username}, {$set : data}, () => {
            res.json({'message' : 'update ok'});
        });
    }

    passwordChange = (req : express.Request, res : express.Response) => {
        let username = req.body.username;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;

        User.findOne({'username' : username, 'password' : oldPassword}, (err, user) => {
            if (user == null) {
                res.json({'message' : 'wrong old password'});
            }
            else {
                User.updateOne({'username' : username, 'password' : oldPassword}, {'password' : newPassword}, () => {
                    res.json({'message' : 'password change ok'});
                });
            }
        })
    }

    updateSalesman = (req : express.Request, res : express.Response) => {
       let salesman = req.body.salesman;
       User.findOne({'username' : {'$ne' : salesman.username}, 'email' : salesman.email}, (err, user : any) => {
           if (user) {
                res.json({'message' : 'emailAlreadyExists'});
           }
           else {
               User.updateOne({'username' : salesman.username}, salesman, () => {
                   res.json({'message' : 'update ok'});
               });
           }
       });
    }
}