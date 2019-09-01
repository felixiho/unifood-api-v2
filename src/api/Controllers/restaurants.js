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

export default {addRestaurant}