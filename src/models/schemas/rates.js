import mongoose from 'mongoose';

const {Schema} = mongoose;
 

 
export default 
   new Schema({
        restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
        rate: Number,
        comment: String,
        imageUrls: [String],
        email: {type: String},
        name: {type: String, required: true},
        upvotes: {type: Number, default: 0},
        downvotes: {type: Number, default: 0},
        flagged: {type: Number, default: false}  
        },    {timestamps: true});
