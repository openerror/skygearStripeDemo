# DEMO NAME PENDING

### Skygear demo showcasing Python cloud functions

By invoking Python cloud functions, this demo is able to access the [Stripe API](), carry out a mock purchase, and record the transaction in [Skygear's](https://skygear.io) built-in database. To call the cloud functions from the frontend, Javascript is embedded into the HTML.


## Features

## Custom Settings

## Usage Examples

- Subscription forms
- Sign up for more information
- Web app sign up confirmation
- Auto welcome email (using cloud functions part without the form)
- Receive support requests

## Develop (Cloud Functions)
- Cloud function using Python 3.6. [Installation Guide](http://docs.python-guide.org/en/latest/starting/install3/osx/).
- Initialize an virtual env for the first time. [Follow this guide.](http://docs.python-guide.org/en/latest/dev/virtualenvs/)

```python3 -m venv env```

```source env/bin/activate```

Note: If there is error when running `pip install -r requirements.txt` on `Python3.6`, you may need to use `easy_install pyzmail` to install pyzmail instead.

## Credits

## Contribution

### About Skygear
[Skygear](https://skygear.io) is an open-source backend for apps. You can write plugins to enrich your application. Skymail is a perfect example to demostrate the use of cloud functions.

Besides sending emails, Skygear is suitable for writing simple or even database-connected cloud functions.
