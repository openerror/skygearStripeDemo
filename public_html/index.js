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
    document.getElementById("total").innerHTML += total + " USD";
}

var emailEl= document.getElementById('email');
var receiverEl= document.getElementById('receiver');
var subjectEl= document.getElementById('subject');
var messageEl= document.getElementById('message');
var responseEl= document.getElementById('response');
var responseMsgEl= document.getElementById('response-msg');

document.getElementById('emailForm').addEventListener('submit', function(e) {
  e.preventDefault();

  var captcha = (typeof grecaptcha !== 'undefined')? grecaptcha.getResponse() : "";

  if (email.value == '') {
    if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
    responseMsgEl.innerHTML = "No email given.";
    responseEl.style.display = "block";
    return;
  }
  const params = {
    'to_email': emailEl.value,
    'subject': subjectEl.value,
    'custom_message': messageEl.value,
    'grecaptcha': captcha
  };
  skygear.lambda('send_invitation_email', params)
    .then(response => {
      console.log(response); // {'result': 'OK'}
      // Handle response
      if (response.result == "OK") {
        responseMsgEl.innerHTML = "Sent!";
        responseEl.style.display = "block";
      } else {
        responseMsgEl.innerHTML = "Email not sent!";
        responseEl.style.display = "block";
      }
    });
  if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
});
