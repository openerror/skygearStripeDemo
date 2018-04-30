# Stripe x Skygear
### Skygear demo showcasing Python cloud functions

How to bill your user on Stripe using Skygear Cloud Functions.

By invoking Python cloud functions, this demo is able to access the [Stripe API](https://stripe.com/), carry out a mock purchase, and record the transaction in [Skygear's](https://skygear.io) built-in database. To call the cloud functions from the frontend, Javascript is embedded into the HTML.

## Structure

```
skygear.json <- contains the skygear app infomation, you shall update your app name inside
requirements.txt <- pip dependencies required by the app
__init__.py <- entry point of Skygear cloud function
settings.py <- settings of the cloud functions, you shall update stripe api key here
/public_html <- demo web client in html and javascript

```

## Possible applications
- Quickly deploy web payment forms without re-inventing the wheel :)
- Utilise existing functionalities of Stripe for secure transactions

## Set-up and Usage Instructions
### Prepare the Python environment
This demo was developed using Python version 3.6, and has not been tested extensively on other set ups. It is recommended to carry out the following steps in a new [conda environment](https://conda.io/docs/user-guide/tasks/manage-environments.html) or [virtual env](http://docs.python-guide.org/en/latest/dev/virtualenvs/).


### Set up API keys
Change the Skygear endpoint and API keys at `public_html/index.js`. For Stripe, insert the appropriate test key in `settings.py`.

## Develop
To begin development locally, install *skygear* and *stripe_api* on *pip*. These packages are not available elsewhere.
```
pip install skygear stripe_api
```

## Deploy

To host the demo on the official cloud [Skygear.io](https://skygear.io), please also install [*skycli*](https://github.com/SkygearIO/skycli), a command-line interface to the Skygear portal. Apart from database functionalities, the demo should also work locally on disk.

To initialise a cloud function project, go to the working directory and execute `skycli init`. Then follow the onscreen instructions to set up automated submission to the official cloud.

### Test and run :)
If deployed onto the official cloud, access through [](https://[app_name].skygeario.com/static). If on disk, simply open index.html.

Select in the HTML frontend the amount and type of coffee beans to "order"; enter dummy card information into the payment form, and then click **Submit**. For example, try the card number 4242 4242 4242 4242, plus any arbitrary combination of expiration date, CSV and ZIP code. The payment should now appear in your Stripe account.

## Credits
Everest Law wrote the code; David Ng and Ten Tang from Oursky gave valuable feedback on bug-fixes and error-handling.

### About Skygear
[Skygear](https://skygear.io) is an open-source backend for mobile and web-based apps. You can write plugins to enrich your application.
