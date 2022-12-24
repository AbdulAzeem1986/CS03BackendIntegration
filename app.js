// Task1: initiate app and run server at 3000

var express = require("express");
var Cors = require("cors");
var Bodyparser = require("body-parser");
var Mongoose = require("mongoose");
var {Employeemodel} = require("./model/employee");

var app = new express;

app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}));

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 

Mongoose.connect("mongodb+srv://azeemharys86:Azeematlas1986@cluster0.pxfuqj2.mongodb.net/employeeDB?retryWrites=true&w=majority",{useNewUrlParser:true});

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


//TODO: get data from db  using api '/api/employeelist'

app.get("/api/employeelist",(req,res)=>{

    Employeemodel.find(
    
    (err,data)=>{
        if (err) {
            res.json({"Status":"Error","Error":err})
        } else {
            res.json(data);
            
        }
    })
});


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get("/api/employeelist/:id",(req,res)=>{
    var id = req.params.id;
    Employeemodel.find({"_id":id},(err,data)=>{
        if (err) {
            console.log(err);
            res.json({"Status":"Error","Error":err})
        } else {
            res.json({"Status":"Success","Data":data})   
            
        }
    })
});




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post("/api/employeelist",(req,res)=>{
    var data = {
        name:req.body.name,
        location:req.body.location,
        position:req.body.position,
        salary:req.body.salary}

    var employee = new Employeemodel(data);

    employee.save((err,data)=>{
        if (err) {
            res.json({"Status":"Error","Error":err})
        } else {
            res.json({"Status":"Submitted successfully", "Data":data})
            console.log(employee);
        }
    })
});





//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete("/api/employeelist/:id",(req,res)=>{

    var id = req.params.id;
    var data = req.body;
    Employeemodel.findByIdAndDelete({"_id":id},data,(err,data)=>{
        if (err) {
            res.json({"Status":"Error","Error":err})
        } else {
            res.json({"Status":"Success","Data":data})   
        }
    })
});



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put("/api/employeelist",(req,res)=>{
    
    var update = req.body.name;
    var data = req.body;

    Employeemodel.findOneAndUpdate({"name":updateimage.png},data,(err,data)=>{
        if (err) {
            res.json({"Status":"Error","Error":err})
        } else {
            res.json({"Status":"Updated successfully", "Data":data})
        }
    })
});

app.listen(3000);

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



