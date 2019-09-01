import mongoose from 'mongoose';

const {Schema} = mongoose;
 

export default () => 
   new Schema({
        Name:  String,
        Location: String,
        Rating:   {type: Number, default: 4.0}, 
        Phone: [Number],
        Address: String,
        Description: String,
        OpeningHours: [String],
        PopularDish: [String],
        Menu: [String], 
        comments: [{ body: String, date: Date }],
        
        },  {timestamps: true});
