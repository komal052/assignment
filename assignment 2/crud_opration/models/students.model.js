const mongoose= require('mongoose');

var stu = new  mongoose.Schema({
   
    name:{
        type:String
    },
    city:{
        type:String
    },
    contactno:{
        type:String
    },
    image:{
        type:String
    }
});
mongoose.model('student',stu);