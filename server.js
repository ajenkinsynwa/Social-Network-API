const express = require('express');
const mongodb = require('mongodb').MongoClient;
const db = require('./config/db-connect');
const { User, Thought} = require('./models');

const app = express ();
const PORT = process.env.PORT || 3001; 

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongob://localhost/social-network', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true

}); 

mongodb.set('debug', true);

app.listen(PORT, () => console.log(`listening on localhost:${PORT}`));
