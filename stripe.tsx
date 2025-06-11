// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_...');
admin.initializeApp();

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  const amount = data.amount;


  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
});
