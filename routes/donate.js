var express = require("express");
var router = express.Router();
var stripe = require("stripe")("");
var Home = require('../models/aboutUs')
var nodemailer = require("nodemailer");



//setting up the route | Getting the landing page
router.get("/", function(req, res){
    Home.find({},function(err, allHome){
        if(err){console.log(err);}

        else{res.render("donate", {home:allHome});}
    });
});

router.get("/complete", function(req,res){
    Home.find({},function(err, allHome){
        if(err){console.log(err);}

        else{res.render("complete", {home:allHome});}
    });
})

router.post("/stripe", async (req, res) => {

    var name = `${req.body.fname} ${req.body.lname}`;

    var Offering_type = `${req.body.offering_type}`;

    

    // Gets amount value and check of it has $ symbol on it and replace it with an empty space
    var amountVal = req.body.amount;
    amountVal = amountVal.replace('$','');
    const allHome = await Home.find({});
    try {
      stripe.customers
        .create({
          name: name,
          email: req.body.email,
          source: req.body.stripeToken
        })
        .then(customer =>
          stripe.charges.create({
            amount: amountVal * 100,
            currency: "usd",
            customer: customer.id,
            description: Offering_type,
            statement_descriptor: 'Refugio Seguro'
          })
        )
        .then(() => 
        Home.find({},function(err, allHome){
            if(err){console.log(err);}

            else{res.render("complete", {home:allHome});}
        })).catch(err => 
          {
            res.render('fail',{home:allHome, error: catchError(err)})
            console.log({err: catchError(err)});
          });
      } catch (err) {
      res.send(err);
    }
  });


  function catchError(err, res){
    switch (err.type) {
      case 'StripeCardError':
        // A declined card error
        return `${err.message}\nExample: Your card expiration year is invalid.` // => e.g. "Your card's expiration year is invalid."
        break;
      case 'StripeInvalidRequestError':
        // Invalid parameters were supplied to Stripe's API
        return err.message;
        break;
      case 'StripeAPIError':
        // An error occurred internally with Stripe's API
        return err.message
        break;
      case 'StripeConnectionError':
        // Some kind of error occurred during the HTTPS communication
        return err.message
        break;
      case 'StripeAuthenticationError':
        // You probably used an incorrect API key
        return err.message
        break;
      case 'StripeRateLimitError':
        // Too many requests hit the API too quickly
        return err.message
        break;
      case 'StripePermissionError':
        // Access to a resource is not allowed
        return err.message
        break;
      case 'StripeIdempotencyError':
        // An idempotency key was used improperly
        return err.message
        break;
      case 'StripeInvalidGrantError':
        // InvalidGrantError is raised when a specified code doesn't exist, is
        // expired, has been used, or doesn't belong to you; a refresh token doesn't
        // exist, or doesn't belong to you; or if an API key's mode (live or test)
        // doesn't match the mode of a code or refresh token.
        return err.message
        break;
    }
  }


module.exports = router;