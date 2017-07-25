# picture-app
## Description
A full-stack web application in the style of (and created as a clone of) Pintrest, allowing users to share and comment on images and Youtube videos.

The application client is created using Create-React-App, with an Express server implementing a GraphQL and Mongoose API on the back end.

The application implements a Twitter OAuth login feature, alongside a local signup option. A Twitter API key is required for the app to make use of the Twitter option.

Project is currently a work in progress.

Created as an exercise for [Free Code Camp](http://freecodecamp.com).
## Installing
```
npm install
```
## Config
### Twitter OAuth
To make use of the Twitter login feature, obtain an application API key from [dev.twitter.com](https://dev.twitter.com), then place the following lines in a file named `./server/.env` with the relevant values.
```
TWITTER_CONSUMER_KEY=<key>
TWITTER_CONSUMER_SECRET=<secret>
TWITTER_CALLBACK_URL=<url>
```
### MongoDB
By default, the server will attempt to use `mongodb://localhost:27017/pintrest-clone` as its database URI, and `mongodb://localhost:27017/pintrest-clone-test` as its test database. These options require a MongoDB database running locally. To specify an external/alternate URI, place the desired values in a file named `./server/.env`.
```
MONGO_URI=<uri>
MONGO_TEST_URI=<test_uri>
```
## Building
Creating a production build of this application can be achieved with Create-React-App's standard 'build' command, and will output to a `build` folder in the root directory.
```
npm run build
```
## Running

To run a development server:
```
npm run start:devserver
npm start
```

To run in production (defaults to port 3000 unless specified):
```
npm run build (if necessary)
npm run start:server
```

## Testing

Testing client:
```
npm test
```

Testing server:
```
npm run test:server
```
