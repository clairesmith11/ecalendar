const express = require('express');
const mongoose = require('mongoose');
const eventRoutes = require('./eventRoutes');
const { notFoundError, errorHandler } = require('./errorHandler');

//Init express app
const app = express();
//Parse body to JSON
app.use(express.json());
//Cors headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});
//Connect MongoDb database
const connectToDb = async () => {
    try {
        const connection = await mongoose.connect("mongodb://localhost:27017/testdb", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log('Database connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

connectToDb();
//Connection
app.get('/', (req, res) => res.send('Welcome to the API'));
//Routing
app.use('/api/event', eventRoutes);
//Error handling
app.use(notFoundError);
app.use(errorHandler);

//Start server
app.listen(5000, console.log('Server running on port 5000'));