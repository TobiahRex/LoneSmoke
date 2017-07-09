# _Lone Smoke:_
Created: 11 June 2017

## CLOUD ARCHITECTURE:
<img src="http://i.imgur.com/bwivCUw.png" />

## DESCRIPTION:
Static Food Menu for Beach BBQ company in Japan.
  * Uses _apisauce_ for API calls. See API README.md for details.
  * Uses _redux-sagas_ to call customized api methods.
  * Uses _redux_sauce_ to create Types, Creators & Reducer.
  * Uses _redux-logger_ to allow for informative workflow from the devtools console.  
  * Uses _redux-devtools-extension_ to allow for a macro perspective picture of your current store's state.
  * Airbnb Style Guide implemented.

## Setup:
  - `npm i` to install dependencies
  - touch a ".env" file and add 3 variables
    * BASE_URL=http://localhost:3000/
    * DEPLOY_URL=(your deployed url)
    * NODE_ENV=development
      - WARNING: You will not successfully spin up the app without doing this step.
  - `npm start` for development server
    * Once the "webpack built xxxxxx..." message appears (May take a few moments) the app will start.
  - `npm run build` for production server
    * This command will automatically change the NODE_ENV env variable to "production" and set off a chain of events for creating a bundle for production.


  NOTE: I Highly recommend running `npm update --save` to update package json before running `npm start` or `npm build`.

## Updates:
* June 11th, 2017:
  - Created.

## ScreenShots:
* Menu Page
  - <img src="foobar" alt="Menu"/>
