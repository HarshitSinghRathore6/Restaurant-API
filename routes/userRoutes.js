const express = require('express');
const { getUserController, updateUserController, updatePasswordController, deleteUserController } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


//routers
//GET USER
router.get('/getUser',authMiddleware, getUserController)
router.put('/updateUser', authMiddleware, updateUserController)
router.put('/updatePass',authMiddleware, updatePasswordController)
router.delete('/deleteUser/:id', authMiddleware, deleteUserController)

module.exports = router;