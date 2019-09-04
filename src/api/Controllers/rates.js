import Rates from '../../models/ratesModel.js';
import Restaurant from '../../models/restaurantModel.js';
import {  validationResult } from 'express-validator';

/**
 * @function postRating
 * @description Add a new restaurant to the db
 * @param {*} req 
 * @param {*} res 
 */
const postRating = async (req, res) => {   
    //Validate body 
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const data = req.body;
    //check if restaurant exists
    Restaurant.findById(data.restaurantId)
        .then( getRestaurant => {
             if(!getRestaurant){ 
                return res.status(422).json({ errors: "Invalid Restaurant"})
            }  
            try {
                const newRate = new Rates({
                    restaurantId: data.restaurantId,
                    rate:  data.rate,
                    comment: data.comment,  
                    imageUrls: data.imageUrls,
                    email: data.email,
                    name: data.name, 
                });
                newRate.save()
                    .then( savedRate => { 
                        return res.json(savedRate );
                    })
            } catch (error) { 
                res.status(500).send(error);
            }
        })
        .catch(error => {
            //Catch error for wrong ID
            if(error.name == "CastError" ){
                res.status(422).send({
                    errors: [
                        {
                            msg: "Restaurant does not exist"
                        }
                    ]
                }); 
            }
            res.status(500).send(error);
        });
   
    

}

export default { postRating }