// UPDATE the endpoint here
const endpoint = 'https://babystep.skygeario.com/'; // trailing slash is required
const apiKey = 'a948f89769ce4555933a42fa2c62928e';


skygear.config({
  'endPoint': endpoint,
  'apiKey': apiKey,
}).then(() => {
  console.clear();
  console.log('Skygear container is now ready for making API calls.');
}, (error) => {
  console.error(error);
});

function orderTotal() {
    /* Updates and displays the order amount on HTML frontend */
    var type = document.paymentForm.order_item.value;
    var quantity = parseInt(document.paymentForm.order_amount.value);

    quantity = (quantity== -1)? 0 : quantity; // If not integer, then assume 0

    if (type == "bean_standard_100"){
        var unitPrice = 5;
    } else if (type == "bean_deluxe_100") {
        var unitPrice = 7;
    } else if (type == "") {
        var unitPrice = 0;
    }
    var total = unitPrice * quantity; //USD
    document.getElementById("total").innerHTML = total;
}

function validateName(name){
    if (name == ''){
        alert("Please input a name for your order. Aborting for now.");
        return false;
    } else {
        return true;
    }
}

function stripeTokenHandler(token) {
    /* Triggered after clicking "Submit" under the card form.
        IF card info is valid, will call Python cloud function to actually
        charge the card.
    */

    // Ideally, should perform some form of input validation before proceeding
    // e.g. check whether there are invalid characters in clientName
    var clientName = document.paymentForm.name.value;
    if (validateName(clientName) === false){
        return false;
    }

    var total = Number(document.getElementById("total").innerHTML);
    console.log("Token received; charging " + total + " USD");

    const params = {
        "stripeToken": token,
        "charge": total, // Charge amount in whole DOLLARS; e.g. total=14.1 == 14.1 USD
        "product": document.paymentForm.order_item.value,
        "clientName": document.paymentForm.name.value
    };

    skygear.lambda("submitPayment", params)
        .then(response => {
            console.log(response);

            if (response.success === true){
                alert("Charge successful!")
                console.log("Payment is sent!");

                // Record successful charge in private database
                skygear.auth.signupAnonymously().then((user) => {
                    console.log(user); // user record without email and username
                    const recordDBType = skygear.Record.extend('Selling Record');
                    const salesRecord = new recordDBType(response);

                    skygear.publicDB.save(salesRecord).then((record) => {
                            console.log(record);
                        }, (error) => {
                            console.error(error);
                        }
                    );
                }, (error) => {
                    console.error(error);
                });

            } else {
                // Charge failed; print response to JS console
                console.log(response);
                if (typeof response.error_msg !== "undefined") {
                    alert("Error: did you forget to select a product and/or an amount?");
                }
                const recordDBType = skygear.Record.extend('Failure Record');
                const failureRecord = new recordDBType(response);

                skygear.publicDB.save(failureRecord).then((record) => {
                        //console.log(record);
                    }, (error) => {
                        console.error(error);
                    }
                );
            }
        })
}

// ############################ //
/* Stripe related code below */

// Create a Stripe client.
var stripe = Stripe('pk_test_uAtBlhuCgWcQ1OO9H6DfcNC4');

// Create an instance of Elements.
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: '#32325d',
    lineHeight: '18px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element.
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission.
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the user if there was an error.
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  });
});
