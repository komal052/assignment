require('./models/db');
const express=require('express');
const app=express();
const path=require('path');
const exhandler=require('express-handlebars');
const bodyParser = require('body-parser');
const multer=require('multer');

const studentsController=require('./controller/studentsController');

var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/upload");
    },
    filename:(req,file,cd)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})



app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(multer({
    storage:storage
}).single('file'));

app.use(bodyParser.json());
app.set('views',path.join(__dirname,'/views/'));
app.use('/public',express.static(path.join(__dirname,'public')));
app.engine('hbs',exhandler({extname:'hbs',defaultLayout:'mainlayout',layoutsDir:__dirname + '/views/layouts/'}));
app.set('view engine','hbs');

app.listen(3000,()=>{
    console.log('express server started at port : 3000');
});

app.use('/students',studentsController)