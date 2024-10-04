const JWT = require('jsonwebtoken')
const userModel = require('../model/userModel')
const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

const getUserController = async (req, res) =>{
    try {
        const user = await userModel.findById({_id:req.body.id})
        if(!user){
            return res.status(404).send({
                success:false,
                messgae:'user not found'
            })
        }

        //hiding pass
        user.password = undefined 

        res.status(200).send({
            success:true,
            message:'user data found and retrived',
            user
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'error',
            errr
        })
    }

}


const updateUserController = async (req, res) =>{
    try {
        //finding user
        const user = await userModel.findById({_id:req.body.id})

        //validating user
        if(!user){
            res.status(404).send({
                success:false,
                message:'user not found',
            })
        }
        
        //updating user
        const {userName, phone} = req.body
        if(userName) user.userName = userName
        if(phone) user.phone = phone

        //saving user
        await user.save()
        res.status(200).send({
            succes:true,
            message:'user updated',
        })


    } catch (error) {
        res.status(500).send({
            success:false,
            message: 'error occured in user updation',
            
        })
        console.log(error);
    }
}

const updatePasswordController = async (req, res) =>{
    try {
        const user = await userModel.findById({_id:req.body.id})

        if(!user){
            return res.status(500).send({
                success:false,
                message:'user not found'
            })

        }

        const {oldPass, newPass} = req.body

        if(!oldPass || !newPass){
            res.status(400).send({
                success:false,
                message:'enter old and new pass'
            })
        }

        //comapring old and new passs
        const isValid = await bcrypt.compare(oldPass, user.password)
        if(!isValid){
            return res.status(502).send({
                success:false,
                message:'wrong old pass'
            })
        }

        //hashing the pass
        const salt = bcrypt.genSaltSync(10)
        const hasedPassword = await bcrypt.hash(newPass, salt)

        //updating pass
        user.password = hasedPassword

        await user.save()

        //hiding pass
        user.password = undefined

        res.status(200).send({
            success:true,
            message:'password updated'
        })


    } catch (error) {
        res.status(500).send({
            success:false,
            message: 'couldnt update pass',
            error
        })

        console.log(error)
        
    }



}

const deleteUserController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success:true,
            message:"user deleted"
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:'error in user delete api'
        })
    }
}

module.exports = {getUserController, updateUserController, updatePasswordController, deleteUserController}