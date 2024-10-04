const express = require('express');
const { createRestaurant, getAllRestaurant, getResById, deleteResById } = require('../controller/restaurantController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


//routers
//create restaurant || POST   
router.post('/createRes',authMiddleware, createRestaurant)

//getAll restaurant
router.get('/getAllRestaurant', getAllRestaurant)

//getResById
router.get('/getResById/:id', getResById)

//deleteById
router.delete('/deleteResById/:id',authMiddleware, deleteResById)


module.exports = router;