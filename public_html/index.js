// UPDATE the endpoint here
skygear.config({
  'endPoint': 'https://babysteps.skygeario.com/', // trailing slash is required
  'apiKey': 'a948f89769ce4555933a42fa2c62928e',
}).then(() => {
  console.clear();
  console.log('Skygear container is now ready for making API calls.');
}, (error) => {
  console.error(error);
});

function orderTotal() {
    //alert("I have been triggered!");

    var type = document.orderForm.order_item.value;
    var quantity = parseInt(document.orderForm.order_amount.value);

    if (type == "bean_standard_100"){
        var unitPrice = 5;
    } else if (type == "bean_deluxe_100") {
        var unitPrice = 7;
    }
    var total = unitPrice * quantity; //USD
    console.log(total);
    document.getElementById("total").innerHTML = total + " USD";
}
