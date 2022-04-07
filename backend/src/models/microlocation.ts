import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let MicroLocation = new Schema({
    name : {
        type : String
    },
    municipality : {
        type : String
    }
});


export default mongoose.model('MicroLocation', MicroLocation, 'mikrolokacija');