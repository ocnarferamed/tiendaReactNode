const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    name:{type:String, required:true},
    password:{type:String, required:true}
});


userSchema.methods.comparePassword = function(password,callback){
    bcrypt.compare(password,this.password,function(err,same){
        if(err){
            callback(err);
        }else{
            callback(err,same);
        }
    });
}


module.exports = mongoose.model('User', userSchema);