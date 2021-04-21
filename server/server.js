const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const eventRoutes = require('./eventRoutes');
const { notFoundError, errorHandler } = require('./errorHandler');

//Configure dotenv
dotenv.config();
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
        const connection = await mongoose.connect(process.env.MONGO_URI, {
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
//Routing
app.use('/api/event', eventRoutes);
//Set static assets for production
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}
//Error handling
app.use(notFoundError);
app.use(errorHandler);

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('App is running'));