Find Me!
========

Find me! is a web-service that allows for people w/ modern smarthphones to easily find each other using Google Maps, geo-tracking and a persistent server.

The interface is an LCARS implementation, which will be instantly recognizable by any Star Trek fan. This is an attempt to translate this into proper HTML at the same time.

How to get it running
---------------------

It should be really simple to get this running. You need the following things:
* git (to get the code)
* the code
* node v. 0.4.5+ (to run the code)

After getting the code and everything is setup, it should just be a question of running 'node server.js'. Every required node-module is bundled in the git-repo.

I have not tested this though, so don't blame me if it doesn't work :P (although I would like to be notified, so I can dedicate some time to fix problems ^^).

Supported browsers
------------------

* Mobile Safari (iOS 4.3+)
* Safari for Mac (5+)

### Mostly functioning browsers (not tested)
* Chrome
* FireFox
* Android-based browsers
* IE 9

My supported browser-list is per specification very narrow, as this is built mostly to myself, and I don't own that many different devices.

But that being said, it will function in all modern browsers, as I follow the standards. The supported-list is mostly just a reflection of what I test against, and that I very much intend to use the bleeding-edge standards as much as possible.

How it functions
----------------

You should see all participating users immediately upon starting the site. If you want to be tracked as well, you should enter a name and click "Track Me!".

"Auto-start" will attempt to start tracking automatically, the next time you open the site. Otherwise, you will have to click the "Track Me!" button yourself.

"Store location" tells the server not to kill your position when you log off. You can always remove the location manually by detoggling the "Track Me!" button.

JavaScript Libraries
--------------------

Right now it uses 2 javascript libraries. My own (lib.js) and Prototype 1.7. The plan is to have mine replace prototype, but it is not capable of that yet. So there are some overlap.

The reason for not using pure prototype is, that prototype have taken some turns that I do not agree with (such as the decision not to use proper REST-based Ajax (nothing but post/get is supported) just because IE < 8 does not support it in forms (it is supported as Ajax...)), and it does way too much. I have a much smaller requirement, and support for old browsers is not one of them.
