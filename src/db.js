
import mongoose from 'mongoose';
import config from './config.js'; 
const { db } = config; 
export default callback => {
	// connect to a database if needed, then pass it to `callback`: 
	const connect = mongoose.connect(db, {useNewUrlParser: true}); 
	callback(connect);
} 
