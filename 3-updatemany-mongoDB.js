const mongoose = require('mongoose');
const async = require('async');
mongoose.connect('mongodb://localhost/test');

// ES6 Promises
mongoose.Promise = global.Promise;


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// Define schema and model
var kittySchema = mongoose.Schema({
  name: String,
  age: Number,
  friend:[String]
});


var Kitten = mongoose.model('Kitten', kittySchema);

// Instantiate model.
var alex = new Kitten({ name: 'alex',friend:['bob'] });
var bob =  new Kitten({name:'bob',friend:['chenbin']});
var chenbin =  new Kitten({name:'chen bin',friend:['david']});
var david =  new Kitten({name:'david',friend:['alex']});

var arr = [alex,bob,chenbin];


// 3. Validate DB to chekc if every kitten has freinds. Then add freind bob to each of kitten.
Kitten.updateMany({friend:{$ne:'bob'}},
                      {$push:{friend:'bob'}}
                    ,function(err,result){
  if(err) return console.err(err);
  console.log(result);   // { n: 5, nModified: 5, ok: 1 }

mongoose.connection.close();
});



/*Query Selectors¶


Name	Description
$eq	Matches values that are equal to a specified value.
$gt	Matches values that are greater than a specified value.
$gte	Matches values that are greater than or equal to a specified value.
$in	Matches any of the values specified in an array.
$lt	Matches values that are less than a specified value.
$lte	Matches values that are less than or equal to a specified value.
$ne	Matches all values that are not equal to a specified value.
$nin	Matches none of the values specified in an array.*/


/*Update Operators¶

Name	Description
$	Acts as a placeholder to update the first element that matches the query condition.
$[]	Acts as a placeholder to update all elements in an array for the documents that match the query condition.
$[<identifier>]	Acts as a placeholder to update all elements that match the arrayFilters condition for the documents that match the query condition.
$addToSet	Adds elements to an array only if they do not already exist in the set.
$pop	Removes the first or last item of an array.
$pull	Removes all array elements that match a specified query.
$push	Adds an item to an array.
$pullAll	Removes all matching values from an array.*/
