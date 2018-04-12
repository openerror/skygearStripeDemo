// UPDATE the endpoint here
apiKey = 'a948f89769ce4555933a42fa2c62928e';
skygear.config({
  'endPoint': 'https://babysteps.skygeario.com/', // trailing slash is required
  'apiKey': apiKey,
}).then(() => {
  console.clear();
  console.log('Skygear container is now ready for making API calls.');
}, (error) => {
  console.error(error);
});

function orderTotal() {
    /* Updates and displays the order amount on HTML frontend */
    //alert("I have been triggered!");

    var type = document.orderForm.order_item.value;
    var quantity = parseInt(document.orderForm.order_amount.value);

    if (type == "bean_standard_100"){
        var unitPrice = 5;
    } else if (type == "bean_deluxe_100") {
        var unitPrice = 7;
    }
    var total = unitPrice * quantity; //USD
    document.getElementById("total").innerHTML = total;
}

function stripeTokenHandler(token) {
    /* Triggered after clicking "Submit" under the card form.
        IF card info is valid, will call Python cloud function to actually
        charge the card.
    */
    var total = Number(document.getElementById("total").innerHTML);
    console.log("Token received; charging " + total + " USD");

    const params = {
        "stripeToken": token,
        "charge": total, // Charge amount in whole DOLLARS; e.g. total=14.1 == 14.1 USD
        "product": document.orderForm.order_item.value
    };

    skygear.lambda("submitPayment", params)
        .then(response => {
            console.log(response);
            alert("Charge attempted!");

            if (response.success === true){
                alert("Charge successful!")
                console.log("Payment is sent!");

                // Record successful charge in private database
                skygear.auth.signupAnonymously().then((user) => {
                    console.log(user); // user record without email and username
                }, (error) => {
                    console.error(error);
                });

                // const user = skygear.auth.currentUser;
                const recordDBType = skygear.Record.extend('Selling Record');
                const salesRecord = new recordDBType(response);

                skygear.publicDB.save(salesRecord).then((record) => {
                        console.log(record);
                    }, (error) => {
                        console.error(error);
                    }
                );

            } else {
                // Charge failed; print response to JS console
                console.log(response);
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
