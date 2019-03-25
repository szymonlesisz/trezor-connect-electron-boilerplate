## Simple example of electron + trezor-connect integration 

Run:
- yarn 
- yarn dev

Files:
- src/electron.js: electron initialization
- src/index.js: file loaded in index.html with trezor-connect instance
- src/trezor-connect build of trezor-connect project (local copy of files from connect.trezor.io)

Customization:
- decide if you want to use connect online or offline (described in ./src/electron)
- decide if you want to use "trusted" or "popup" mode (described in src/index.js TrezorConnect.init)
- decide if you want to use popup as electron modal or use "new window" (described in ./src/electron)

What needs to be done:
- Not sure how to enable "native controls" in electron modal on Mac, for now i just put "close" button into popup.html - but looking for better solution
- Test all builds in different environments (Tested on mac and linux)
