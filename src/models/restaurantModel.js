import mongoose from 'mongoose';
import restaurantSchema from "./schemas/restaurants.js";

const { model } = mongoose; 


restaurantSchema.index({
    name: "text",
    description: "text",
    location: "text"
});

export default model('Restaurant', restaurantSchema );

