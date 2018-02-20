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

var arr = [alex,bob,chenbin];


async.each(arr,function(kitten,callback){
  // Call an asynchronous function
  kitten.save(function(err,kitten){
    if (err) return console.error(err);
    console.log(kitten.name); // 'Silence'
    callback();
  })
}, function(err){

  // Close the mongoose
  console.log('alex, bob and chenbin are registered.');
  mongoose.connection.close()


});
