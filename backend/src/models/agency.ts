import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Agency = new Schema({
    type : {
        type : String
    },
    name : {
        type : String
    },
    pib : {
        type : Number
    },
    city : {
        type : String
    },
    address : {
        type : String
    },
    phone : {
        type : Number
    }
});


export default mongoose.model('Agency', Agency, 'agencija');