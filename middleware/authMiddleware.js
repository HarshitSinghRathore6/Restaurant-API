const JWT = require('jsonwebtoken')
const mongoose = require('mongoose')

module.exports = (req, res, next) =>{
    try {

        const token = req.headers["authorization"].split(" ")[1]
    
        JWT.verify(token, process.env.JWT_KEY, (err,decoded) => {
        if(err){
            return res.status(401).send({
                success:false,
                message:"Authorization error"
            })
        }else{
            req.body.id = decoded.id
            next();
        }
    
        })

    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Auth not provided",
            error
        })
    }
}