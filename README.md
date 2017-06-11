# _Lone Smoke:_ [Deployed Here](http://lonesmoke-react.s3-website-ap-northeast-1.amazonaws.com/)
Full-Stack REACT & Redux - Created: 11 June 2017

## DESCRIPTION:
Cannibalized from Templates and Boilerplates from around the web.
  * Uses _apisauce_ for API calls. See API README.md for details.
  * Uses _redux-sagas_ to call customized api methods.
  * Uses _redux_sauce_ to create Types, Creators & Reducer.
  * Uses _redux-logger_ to allow for informative workflow from the devtools console.  
  * Uses _redux-devtools-extension_ to allow for a macro perspective picture of your current store's state.
    - <img src="http://i.imgur.com/GD4VCkW.png" />
  * Configured for front end environment variables using webpack.DefinePlugin().
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

## NOTE on Reducers:
 This bp's Redux reducer methods rely on the developer to customize the logic to maintain immutability of state. This was done _intentionally_ to strengthen developers abilities in manipulating state.  If this feels cumbersome, I highly recommend using _seamless-immutable_ (refs below) to outsource this process in a very clean, and simple way.

## Helper Libraries:
* [apisauce](https://github.com/skellock/apisauce)
* [redux-logger](https://github.com/evgenyrodionov/redux-logger)
* [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)
* [redux-saga](https://github.com/yelouafi/redux-saga)
* [ramda](https://github.com/ramda)

## Suggested Libraries:
* [redux-sauce](https://github.com/skellock/reduxsauce)
* [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)

## Updates:
* June 11th, 2017:
  - Created.

## ScreenShots:
* Menu Page
  - <img src="foobar" alt="Menu"/>
