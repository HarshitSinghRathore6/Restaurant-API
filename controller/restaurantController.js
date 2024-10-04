const restaurantModel = require("../model/restaurantModel")

const createRestaurant = async (req, res) =>{
    try {
        const {title,foods,time,pickup,delivery,isOpen,rating,ratingCount,coords} = req.body

        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message:'enter tile and address'
            })
        }

        const newRestaurant = new restaurantModel({title,foods,time,pickup,delivery,isOpen,rating,ratingCount,coords})

        await newRestaurant.save()
        res.status(201).send({
            success:true,
            message:'restaurant has been created'
        })

    } catch (error) {
        res.status(500).send({
            success:false,
            message:'error in create rest api',
            error
        })
    }
}

const getAllRestaurant = async (req, res) =>{
    try {
        const restaurants = await restaurantModel.find({})
        if(!restaurants){
            res.status(404).send({
                success:false,
                message:'no res found'
            })
        }

        
        res.status(200).send({
            success:true,
            message: 'restaurant found',
            total_res: restaurants.length,
            restaurants
        })
        
    } catch (error) {
        res.send(500).send({
            success:false,
            message:'error in get res api'
        })
    }
}

const getResById = async (req, res) =>{
    try {
        //store id
        const restaurantId = req.params.id
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:'cant find id'
            })
        }

        const restaurant = await restaurantModel.findById(restaurantId)

        if(!restaurant){
            return res.status(404).send({
                successs: false,
                message:'no res found'
            })
        }

        res.status(200).send({
            success:true,
            messag:'Res Found',
            restaurant
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            
            success:false,
            message:'error in get res by id api',
            error
        })
    }
}

const deleteResById = async (req, res) => {
    try {
        const restaurantId = req.params.id
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:'cant find id'
            })
        }
        await restaurantModel.findByIdAndDelete(restaurantId)
        res.status(200).send({
            success:true,
            message:"res deleted"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {createRestaurant, getAllRestaurant, getResById, deleteResById}