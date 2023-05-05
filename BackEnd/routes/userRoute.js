const express = require('express');
const User = require('../models/userModel');
const router = express.Router();



// Create user
router.post('/',async (req,res)=>{
    //const [name,email,age] = req.body;
    try {
        const userAdded = await User.create({
            // DataBase name : value we get during destructring
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        })
        res.status(201).json(userAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error.message})
    }
})


// Get all users from the database
router.get('/',async (req,res)=>{
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

// Get particular user from the database
router.get('/:id',async (req,res)=>{
    const {id} = req.params;
    try {
        const userData = await User.findById({_id:id});
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})


// delete User

router.delete('/:id',async (req,res)=>{
    console.log("Wassup");
    try {
        const deleteUser = await User.findByIdAndDelete({_id:req.params.id});
        res.status(200).json(deleteUser);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})

// Update user
router.patch('/:id',async (req,res)=>{
    const {id} = req.params;
    const {name,email,age} = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})

module.exports = router;