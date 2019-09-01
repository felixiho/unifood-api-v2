import mongoose from 'mongoose';

const {Schema} = mongoose;
 

 
export default 
   new Schema({
        Rate: Number,
        Comment: String,
        ImageUrls: [String],
        Email: {type: String, required: true},
        Name: {type: String, required: true},
        Upvotes: Number,
        Downvotes: Number,
        Flagged: Boolean  
        },    {timestamps: true});
