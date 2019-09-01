import mongoose from 'mongoose';

const {Schema} = mongoose;
 

export default 
   new Schema({
        name:  String,
        location: String,
        rating:   {type: Number, default: 4.0}, 
        phone: [Number],
        address: String,
        description: String,
        openingHours: [String],
        popularDish: [String],
        menu: [String], 
        comments: [{ body: String, date: Date }],

        },  {timestamps: true});
