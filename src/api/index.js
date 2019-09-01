import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import restaurants from './Controllers/restaurants.js'
import { check, validationResult } from 'express-validator';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	//Add new restaurants
	api.post('/addnew',  
		[check('name') 
			.exists()
				.withMessage('Name Must exists')  
		], restaurants.addRestaurant);

	
	return api;
}
