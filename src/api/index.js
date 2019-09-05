import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import restaurants from './Controllers/restaurants.js'
import rates from './Controllers/rates.js';
import { check } from 'express-validator';

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
		], restaurants.addRestaurant
	);
	
	//get restaurant details
	api.get('/restaurant/:id', restaurants.viewRestaurant);

	//get restaurants by paginating
	api.get('/restaurants/:resultLength?/:page?', restaurants.getRestaurants); 

	//search restaurants
	api.get('/get-restaurant/:restaurant', restaurants.searchRestaurants);

	//post rating
	api.post('/rate',  
		[check('restaurantId') 
			.exists()
				.withMessage('Invalid restaurant'),
		check('rate')
		.exists()
			.withMessage('Rate cannot be empty'),
		check('name') 
			.exists()
				.withMessage('Name Must exists') 
		], rates.postRating
	);


	//get ratings by paginating
	api.get('/ratings/:id/:resultLength?/:page?', rates.getComments); 

		//post rating
	api.post('/handle-comment',  rates.handleComment );

	return api;
}
