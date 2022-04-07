import { City } from "./city";
import { Municipality } from "./municipality";

export class Location {
    _id : number;
    name : string;
    municipalities : Municipality[];
}