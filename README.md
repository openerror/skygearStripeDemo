# Stripe-gear
### Skygear demo showcasing Python cloud functions

By invoking Python cloud functions, this demo is able to access the [Stripe API](https://stripe.com/), carry out a mock purchase, and record the transaction in [Skygear's](https://skygear.io) built-in database. To call the cloud functions from the frontend, Javascript is embedded into the HTML.

## Possible applications
- Quickly deploy web payment forms without re-inventing the wheel :)
- Utilise existing functionalities of Stripe for secure transactions

## Set-up and Usage Instructions
### Prepare the Python environment
This demo was developed using Python version 3.6, and has not been tested extensively on other set ups. It is recommended to carry out the following steps in a new [conda environment](https://conda.io/docs/user-guide/tasks/manage-environments.html) or [virtual env](http://docs.python-guide.org/en/latest/dev/virtualenvs/).

To begin, install *skygear* and *stripe_api* on *pip*. These packages are not available elsewhere.
```
pip install skygear stripe_api
```

To host the demo on Skygear's official cloud, please also install [*skycli*](https://github.com/SkygearIO/skycli), a command-line interface to the Skygear portal. Apart from database functionalities, the demo should also work locally on disk.

### Create submission folder
If *skycli* is used, then go to the working directory and execute `skycli init`. The program would then guide you to set up automated submission to the official cloud.

### Set up API keys
For Skygear, change index.js. As for Stripe, insert the appropriate test key in settings.py.

### Test and run :)
If deployed onto the official cloud, access through [](https://[app_name].skygeario.com/static). If on disk, simply open index.html.

Select in the HTML frontend the amount and type of coffee beans to "order"; enter dummy card information into the payment form, and then click **Submit**. For example, try the card number 4242 4242 4242 4242, plus any combination of CSV and ZIP code. The payment should now appear in your Stripe account.

## Credits
Everest Law wrote the code; David Ng and Ten Tang from Oursky gave valuable feedback on bug-fixes and error-handling.

### About Skygear
[Skygear](https://skygear.io) is an open-source backend for mobile and web-based apps. You can write plugins to enrich your application.
