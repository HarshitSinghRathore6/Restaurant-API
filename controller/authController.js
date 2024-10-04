const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

// for registration
const registerController = async (req, res) => {
    try {
        const { userName, email, phone, password } = req.body; //opening 

        // validation
        if (!userName || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: 'Provide all fields',
            });
        }

        // checking for existing email
        const existing = await userModel.findOne({ email: email });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'Existing email found',
            });
        }

        // hashing the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating user
        const user = await userModel.create({ userName, email, phone, password: hashedPassword });

        // token creation
        const token = JWT.sign({ id: user._id }, process.env.JWT_KEY, {
            expiresIn: '3d',
        });

        // send response with user data and token
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token, // include token in the response
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in register API',
            error: error.message, // include error message for better debugging
        });
    }
};



//for user login
const loginController = async (req, res) => {
    try {
        const {email, pass} = req.body
        //varification of empty fields
        if(!email || !pass){
            return res.status(500).send({
                success:false,
                message: 'Provide all details'
            })
        }
        //checking in database
        const user = await userModel.findOne({email:email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'username or password is wrong'
            })
        }

        //comapring passs
        const isValid = await bcrypt.compare(pass, user.password)
        if(!isValid){
            return res.status(502).send({
                success:false,
                message:'passwprd is invalid'
            })
        }

        //creating token
        const token = JWT.sign({id:user._id}, process.env.JWT_KEY,{
            expiresIn:'3d'
        })

        //hiding password
        user.password = undefined

        //successful login
        res.status(200).send({
            success:true,
            message:'login was succesfull',
            token
            
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {registerController, loginController}