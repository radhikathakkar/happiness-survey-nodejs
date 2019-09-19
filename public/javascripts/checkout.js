var express = require('express');
var checkoutRouter = express.Router();
const bodyParser = require('body-parser');
const Stripe = require('stripe')('pk_test_mFkAOii4rv0B0wmpcU7t570900u1KAyfkn');
checkoutRouter.use(bodyParser.json());



checkoutRouter.post('/checkout-data', (req,res,next) => {
    // var stripe = Stripe('pk_test_mFkAOii4rv0B0wmpcU7t570900u1KAyfkn');
    Stripe.tokens.create({
        card: {
          number: req.body.number,
          exp_month: req.body.exp_month,
          exp_year: req.body.exp_year,
          cvc: req.body.cvc,
        }
      }, function(err, token) {
        if(err){
            return res.status(500).send('Card number is not valid');
        } else{
            var token = token;
            return res.status(200).json(token);
        }
      });
});

module.exports = checkoutRouter;