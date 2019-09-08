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


/**
 * @function getComments 
 * @description Get all comments based on restaurantId
 * @param {*} req 
 * @param {*} res 
 */
const getComments= async (req, res) => { 
    const length =  req.params.resultLength ? parseInt(req.params.resultLength) : 10; 
    const currentPage = req.params.page ? parseInt(req.params.page) : 1; 

    Restaurant.findById(req.params.id)
        .then( getRestaurant =>{
            if(!getRestaurant){ 
                return res.status(422).json({ errors: "Invalid Restaurant"})
            }  
            try {   
                    Rates.find({restaurantId: req.params.id})
                        .skip(length * (currentPage - 1))
                        .limit(length)
                        .exec((error,  comments)=> {
                            if(!error){ 
                                return res.json( comments ); 
                            }else{
                                res.status(401).send({
                                    errors: [
                                        {
                                            msg: "Something went wrong"
                                        }
                                    ]
                                }); 
                            }
                        })  
            } catch (error) {  
                res.status(500).send(error);
            }
        }).catch(error => {  
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


/**
 * @function handleComment
 * @description upvote or downvote or flag a comment
 * @param {*} req|
 * @param {*} res 
 */
const handleComment = async (req, res) => {   
    //Validate body 
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const data = req.body;  
    Rates.findById(data.ratesId).then((rate) => {
        if(!rate){
            res.status(422).send({
                errors: [
                    {
                        msg: "Rate does not exist"
                    }
                ]
            }); 
        }
        //return mutated version of rate model
        return Object.assign(rate, {
            [data.type]: data.type === "flagged" ? true : rate[data.type] + 1
        });
    }).then((rate) => { 
        return rate.save();
    }).catch(error => {
        res.status(500).send(error);
    }).then((updatedComment) => {
        res.json({ 
            updatedComment
        });
    }).catch((error) => {
        if(error.name == "CastError" ){
            res.status(422).send({
                errors: [
                    {
                        msg: "Rate does not exist"
                    }
                ]
            }); 
        }
        res.status(500).send(error);
    });   
    

}

/**
 * @function getRateCount
 * @description Get the amount of times a restaurant has been rated
 * @param {*} req|@restaurantId
 * @param {*} res 
 */
const getRateCount = async (req, res) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        let rateCount = await Rates.find({restaurantId: req.params.restaurantId});
        return res.json({"ratecount": rateCount.length});
    } catch (error) {
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
    }

}
  
export default { postRating, getComments, handleComment, getRateCount }