const express = require('express');
const restaurantModel = require('../model/Restaurant');
const app = express();

//Read ALL
//http://localhost:3000/restaurants
app.get('/restaurants', async (req, res) => {
    const restaurants = await restaurantModel.find({});
    try {
      console.log(restaurants[0].name)
      res.status(200).send(restaurants);
    } catch (err) {
      res.status(500).send(err);
    }
  });

// Add restaurant
app.post('/restaurants', async (req, res) => {
  
    console.log(req.body)
    const restaurant = new restaurantModel(req.body);
    
    try {
      await restaurant.save((err) => {
        if(err){
          res.send(err)
        }else{
          res.send(restaurant);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });


//Return details by cuisine
// http://localhost:3000/restaurants/cuisine/Japanese
app.get('/restaurants/cuisine/:cuisine',async(req, res) => {
    const cuisine = req.params.cuisine
    const restaurants = await restaurantModel.find({cuisine :cuisine}).select();

    try {
        res.status(200).send(restaurants);
      } catch (err) {
        res.status(500).send(err);
      }
});

//Return restaurant in Asc/Desc
//http://localhost:3000/restaurants?sortBy=ASC
app.get('/restaurants', async (req, res) => {
    const sort = req.query.sortBy
    const restaurants = await restaurantModel.find({}).select("id cuisine name city restaurant_id").sort({'_id' : sort})
  
    try {
      res.send(restaurants);
    } catch (err) {
      res.status(500).send(err);
    }
  })


//return restaurants details where all cuisines are equal to Delicatessen and the city is not equal to Brooklyn
//http://localhost:3000/restaurants/Delicatessen
app.get('/restaurants/Delicatessen', async (req, res) => {
    const restaurants = await restaurantModel.find({cuisine: 'Delicatessen', city: {$ne: 'Brooklyn'}})
    
    try {
      res.send(restaurants);
    } catch (err) {
      res.status(500).send(err);
    }
  })

module.exports = app;
