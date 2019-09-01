import mongoose from 'mongoose';
import restaurantSchema from "./schemas/restaurants.js";

const { model } = mongoose; 

export default model('Restaurant', restaurantSchema );

