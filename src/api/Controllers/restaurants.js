import Restaurant from '../../models/restaurantModel.js';
import {  validationResult } from 'express-validator';

/**
 * @function addRestaurant
 * @description Add a new restaurant to the db
 * @param {*} req 
 * @param {*} res 
 */
const addRestaurant = async (req, res) => {   
    //Validate body 
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    //Create Restaurant  
    const data = req.body;
    try {
        const newRestaurant = new Restaurant({
            name:  data.name,
            location: data.location, 
            phone: data.phone,
            address: data.address,
            description: data.description,
            openingHours: data.openingHours,
            popularDish: data.popularDish,
            menu: data.menu,   
        });
        let savedRestaurant = await newRestaurant.save();
        return res.json(savedRestaurant );
    } catch (error) { 
        res.status(500).send(error);
    }

}


/**
 * @function ViewRestaurant 
 * @description Get restaurant details by id
 * @param {*} req 
 * @param {*} res 
 */
const viewRestaurant = async (req, res) => {     
    try {   
        let getRestaurant = await Restaurant.findById(req.params.id); 
        return res.json( getRestaurant ); 
    } catch (error) { 
        res.status(500).send(error);
    }

}

/**
 * @function getRestaurants 
 * @description Get all restaurants
 * @param {*} req 
 * @param {*} res 
 */
const getRestaurants = async (req, res) => { 
    const length =  req.params.resultLength ? parseInt(req.params.resultLength) : 10; 
    const currentPage = req.params.page ? parseInt(req.params.page) : 1; 

    try {   
        const getRestaurants = await Restaurant.find()
            .skip(length * (currentPage - 1))
            .limit(length);

        const restaurantNumber = await Restaurant.countDocuments(); // count the number of records for that model

        res.setHeader('max-records', restaurantNumber);
        return res.json( getRestaurants ); 
    } catch (error) {  
        res.status(500).send(error);
    }

}

/**
 * @function searchRestaurants 
 * @description Search restaurants
 * @param {*} req 
 * @param {*} res 
 */
const searchRestaurants = async (req, res) => {
    try {
        const partialtitle = new RegExp(req.params.restaurant, "i");
        const results = await Restaurant.find({
            'name': partialtitle 
        })
        .sort({rating: -1})
        .limit(10); 

        return res.json( results );
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * @function getTrending 
 * @description Get trending restaurants
 * @param {*} req 
 * @param {*} res 
 */
const getTrending = async (req, res) => {  

    try {   
        const trending = await Restaurant.find()
                                    .sort({rating: -1})
                                    .limit(3);
  
        return res.json( trending ); 
    } catch (error) {  
        res.status(500).send(error);
    }

}


export default {addRestaurant, viewRestaurant, getRestaurants, searchRestaurants, getTrending}