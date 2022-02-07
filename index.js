const mongoose = require('mongoose');
const express = require('express')
const restaurantRouter = require('./routes/RestaurantRoutes.js');

const app = express()
app.use(express.json())

mongoose.connect('mongodb+srv://trish:anne@comp3123-assignment2.wrcjs.mongodb.net/comp3133?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection')
});

app.use(restaurantRouter);

app.listen(port=3000, () => { console.log(`Server is running...${port}`) });