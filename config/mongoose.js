const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`,
{ 
    useNewUrlParser: true ,
     useUnifiedTopology: true,
     useCreateIndex: true
     });

const db = mongoose.connection;
// mongoose.set('useFindAndModify', false);

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;