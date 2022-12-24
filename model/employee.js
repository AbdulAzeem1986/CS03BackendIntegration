var Mongoose = require("mongoose");

const employeeSchema = {
    
    name:String,
    location:String,
    position:String,
    salary:String
};

var Employeemodel = Mongoose.model("Employees",employeeSchema);

module.exports = {Employeemodel};