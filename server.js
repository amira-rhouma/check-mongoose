const mongoose = require("mongoose")
require('dotenv').config()
  
  try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      "mongodb+srv://amira-rhouma:amira2021@cluster0.s6plz.mongodb.net/Person?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected"),
    );
  } catch (e) {
    console.log("could not connect");
  }

   // Define a schema : person shema 
 const { Schema } = mongoose;
 const PersonSchema = new Schema({
  name:
  { type: String,
   required: true} ,
  age:Number,
  favoriteFoods:[String]
 });
// Creat a model from schema :person model 
const PersonMod = mongoose.model('person', PersonSchema);

// Create an instance of model PersonMod 
const Per = new PersonMod ({ name:"Amira",age:25,favoriteFoods:["fastfood"]});

// // Save the new model instance, passing a callbackn
 Per.save(function(err, data) { if (err) {return handleError(err)} else {console.log(data) }});

// //Create Many Records with model.create()

 PersonMod.create([{name:"amal",age:25,favoriteFoods:["ff","gateaux","burritos"]}, {name:"ahmed",age:10,favoriteFoods:["hambrg"]},{name:"Mary",age:10,favoriteFoods:["hambrg"]},{name:"Mary",age:10,favoriteFoods:["hambrg"]}]);

// // Use model.find() to Search Your Database

PersonMod.find( {name:"amal"}).exec(function(err, data) {if (err) {return handleError(err)} else {console.log(data) } });

// //Use model.findOne() 

PersonMod.findOne({favoriteFoods:'kouskous'}).exec(function(err, data) {if (err) {return handleError(err)} else {console.log(data) } })


// // Use model.findById(() 
PersonMod.findById("60d0fa8f99e18e0980c12674", function (err, data) {if (err) {return console.log(err)}else {console.log(data)}});

// //Perform Classic Updates by Running Find, Edit, then Save
 PersonMod.findById("60d0fa8f99e18e0980c12673", function (err, data) {if (err) {return console.log(err)}else {data.favoriteFoods.push("hamburger" ); console.log(data) ;data.save()}});

// // model.findOneAndUpdate()
  PersonMod.findOneAndUpdate({ name:"amal"},{ new: true },{ age:20},(err, data) => {if (err) { return console.log(err)} else {console.log(data)}})

// // Delete One Document Using model.findByIdAndRemove
 PersonMod.findByIdAndRemove("60d0fa8f99e18e0980c12673",(err, data) => {if (err) { return console.log(err)} else {console.log(data)}})

// // Delete Many Documents with model.remove()
 PersonMod.remove({ name:"Mary" },  done= (err, data)=>{  if (err) { return console.log(err)}else { console.log(data);console.log(data.deletedCount)  } })
    
// // Chain Search Query Helpers to Narrow Search Results
  PersonMod.find({favoriteFoods: "burrito"}) .sort({ name: 1 }) .limit(2) .select({ age: 0 }) .exec(done =(err, data) => { if (err) return console.log(err); done(data);
 }); 
