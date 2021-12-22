const express=require('express');
var router=express.Router();
const mongoose= require('mongoose');
const student=mongoose.model('student');

router.use(express.static(__dirname+"../public/"));

router.get('/',(req,res)=>{
    res.render("students/add",{
        viewtitle : "insert student"
    })
})

router.post('/',(req,res)=>{
    if(req.body._id=='')
    insertstudent(req,res);
    else
    updatestudent(req,res);
})

function insertstudent(req,res)
{
    var s= new student();
 
    s.name=req.body.name;
    s.city=req.body.city;
    s.contactno=req.body.contact;
    const image= req.file;

     s.image= image.path.replace("\\","/");

    s.save((err,doc)=>{
        if(!err){
           res.redirect('students/list');
        }
        else{
            console.log('error during insert the record'+ err);
           }
    })
 }
 function updatestudent(req,res)
 {
     student.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
         if(!err){
            res.redirect('students/list');
         }
        else{
            console.log('error during edit'+err);
        }
     }).lean();
 }
router.get('/list',(req,res)=>{
  
    student.find((err,docs)=>{
        if(!err){
            res.render("students/list",{
                list:docs
            });
        }
        else{
            console.log('error in displaying the list:' +err);
        }
    }).lean();

});
router.get('/:id',(req,res)=>{
    student.findById(req.params.id,(err,doc)=>{
        if(!err)
        {
            res.render("students/add",{
                viewtitle:"update students",
                student:doc
            })
        }

    }).lean();

});
router.get('/delete/:id',(req,res)=>{
    student.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err)
        {
            res.redirect('/students/list');
        }
        else{
            console.log('error in delete'+err);
        }
    });
});

module.exports=router;