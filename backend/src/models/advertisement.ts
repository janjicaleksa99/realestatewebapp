import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Advertisement = new Schema({
    _id : {
        type : mongoose.SchemaTypes.ObjectId
    },
    Realestate : {
        type : Object
    },
    Advertiser : {
        type : Array
    },
    LastEdited : {
        type : String
    }
});


export default mongoose.model('Advertisement', Advertisement, 'oglas');