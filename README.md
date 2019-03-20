## Simple example of electron + trezor-connect integration 

Run:
- yarn 
- yarn dev

Files:
- src/electron.js: electron initialization
- src/index.js: file loaded in index.html with trezor-connect instance
- src/trezor-connect build of trezor-connect project (local copy of files from connect.trezor.io)

Customization:
- decide if you want to use "trusted" or "popup" mode (described in src/index.js TrezorConnect.init)
- decide if you want to use popup as electron modal or use "new window" (described in ./src/electron)

What needs to be done:
- Not sure how to enable "native controls" in electron modal on Mac, for now i just put "close" button into popup.html - but looking for better solution
- Communication with trezor-connect on *.trezor.io domain (or localhost). for now there is a problem with "popup > window.opener" which is not visible for popup hosted online, so is not able to "postMessage" to electron, it is working with "trusted" mode tho
- Test all builds in different environments (Tested on mac and linux)
