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
  name: String
});


var Kitten = mongoose.model('Kitten', kittySchema);

// Instantiate model.
var alex = new Kitten({ name: 'alex' });
var bob =  new Kitten({name:'bob'});
var chenbin =  new Kitten({name:'chen bin'});
var david =  new Kitten({name:'david'});

var arr = [alex,bob,chenbin];
var newarr = [alex, bob, david]


// 2. Filtering test
async.filter(newarr,function(kitten,callback){
  Kitten.findOne({name:kitten.name},function(err,result){
  if(err) return console.err(err);
  console.log('The kitten is',result?'registered':'registering');
  callback(null,!result);
});
},function(err,results){
  console.log(results);
  // Close the mongoose.
  mongoose.connection.close();
});
