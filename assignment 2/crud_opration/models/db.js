const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost:27017/studentdb',{useNewUrlParser:true},(err)=>{
    if(!err){
        console.log("connected");
    }
    else{
        console.log("not connected"+err);
    }
});
require('./students.model');