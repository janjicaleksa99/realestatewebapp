import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let RealEstate = new Schema({
    Name : {
        type : String
    },
    Type : {
        type : String
    },
    City : {
        type : String
    },
    Municipality : {
        type : String
    },
    Microlocation : {
        type : String
    },
    Street : {
        type : String
    },
    Lines : {
        type : Array
    },
    Area : {
        type : Number
    },
    Rooms : {
        type : Number
    },
    ConstructionYear : {
        type : Number
    },
    PublishDate : {
        type : Date
    },
    State : {
        type : String
    },
    Heating : {
        type : String
    },
    Floor : {
        type : Number
    },
    TotalFloors : {
        type : Number
    },
    Parking : {
        type : String
    },
    MonthlyUtilities : {
        type : Number
    },
    Price : {
        type : Number
    },
    About : {
        type : String
    },
    Characteristics : {
        type : Array
    },
    Sold : {
        type : String
    },
    Pictures : {
        type : Array
    }
});


export default mongoose.model('RealEstate', RealEstate, 'nekretnina');