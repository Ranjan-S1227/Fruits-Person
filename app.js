const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser: true});

// Data Validation using Mongoose : Rating can only be from 1 to 10 & name is mandatory !
const fruitSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Name is mandatory to specify"]
    },
    rating:{
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

//creating a model and Collection called Fruits but a singular is used "Fruit"
const Fruit = mongoose.model("Fruit", fruitSchema);

//creating objects
const Apple = new Fruit({
    name:"Apple",
    rating: 8,
    review:"Love It !!"
});
const Banana = new Fruit({
    name:"Banana",rating: 7, review: "Cheap"
});
const Orange = new Fruit({
    name:"orange",rating: 6, review: "sometimes"
});

//Apple.save();

//Fruit.insertMany([Orange, Banana]);


// Reading from the database using Mongoose

Fruit.find(function(err,fruits){
    if(err){
        console.log(err);
    }
    else{
         console.log(fruits);

        // fruits.forEach(function(fruit){
        //     console.log(fruit.name);
        // })      
                  ////---OR----////
                  
        // mongoose.connection.close();
        for (let i = 0; i < fruits.length; i++) {
            console.log(fruits[i].name);
            
        }
    }
});


 

const kiwi = new Fruit({
    name:"kiwi",rating: 6
});

//kiwi.save();

// update
// If the entry misses a value/field, use update 
Fruit.updateOne({name: "kiwi"},{review:"expensive, but taste's good"},function(err){
    if(err){
        console.log(err);

    }
    else{
        console.log("Successfully updated");
    }
});

// delete a particular record;
Fruit.deleteOne({_id: "63909347d2c0faca5a82707f"})



// Est relationship and embedding documents using Mongoose

const pineApple = new Fruit({
    name:"Pine Apple",
    rating:8,
    review:"sweet & sour"
});

//pineApple.save();

const peopleSchema = new mongoose.Schema({
    Pname:String,
    age:Number,
    // embedding fruitSchema to peopleSchema
    favFruit:fruitSchema
});

const Person = mongoose.model("Person",peopleSchema);

const p1 = new Person({
    Pname:"Ranjan",
    age:21
})

const p2 = new Person({
    Pname:"Siddanth",
    age:18,
    favFruit:pineApple
})

//Person.insertMany([p1,p2]);

// **************PineApple and p2 have same object ID********************




