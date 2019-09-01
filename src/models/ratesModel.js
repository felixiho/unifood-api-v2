import mongoose from 'mongoose';
import ratesSchema from "./schemas/rates.js";

const { model } = mongoose; 

export default model('Restaurant', ratesSchema );

