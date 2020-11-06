const User  = require('../models/user');
const userController = {};
const bcrypt = require('bcrypt');

userController.createUser = async (req,res)=>{
    const user = new User({
            name:req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        });
    await user.save();
    
    res.json('User has been created');
};

       

userController.authenticateUser = async (req,res)=>{
    let body = req.body;
    console.log(req.body.email)
    console.log(body)
    User.findOne({"name":`${body.email}`},function(err, result){
        if(err) throw err;    
        if(!result) res.json("Incorrect user or password"); 
        else {
            result.comparePassword(body.password,(err,resultado)=>{
                if(err){
                    res.status(500).json('Authentication error');
                }else if(resultado){
                    res.status(200).json('Validated');
                }else{
                    res.status(500).json('Incorrect user or password');
                }
            })
        }
    });
};



module.exports = userController;