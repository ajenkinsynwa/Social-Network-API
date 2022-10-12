const express = require('express');
const mongodb = require('mongodb').MongoClient;
const db = require('./config/db-connect');
const { User, Thought} = require('./models');

const app = express ();
const PORT = process.env.PORT || 3001; 

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(routes);



