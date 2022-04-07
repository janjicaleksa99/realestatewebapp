import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    name : {
        type : String
    },
    surname : {
        type : String
    },
    username : {
        type : String
    },
    password : {
        type : String
    },
    type : {
        type : String
    },
    city : {
        type : String
    },
    birthDate : {
        type : String       // Mozda treba promeniti u Date
    },
    contact : {
        type : String
    },
    email : {
        type : String
    },
    agency : {
        type : String
    },
    licenseNum : {
        type : String
    },
    profileImage : {
        type : String
    },
    status  : {
        type : String
    },
    favoriteAds : {
        type : Array
    }
});


export default mongoose.model('User', User, 'korisnik');