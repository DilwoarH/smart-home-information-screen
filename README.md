# SmartHome information screen

SmartHome is an information screen which displays useful information such as bus times, train line status and other information useful for modern day SmartHome.

## Demo
https://smart-home-app.netlify.com/

## One click deploy

Easily deploy the app using netlify (for free, forever!).

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/DilwoarH/smart-home-information-screen)


## API credits
This application uses the following APIs:
- [Tfl train line status API](https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status) - Train line status.
- [Tfl road status API](https://api.tfl.gov.uk/road) - Road status
- [Tfl bus arrival API](https://api.tfl.gov.uk/StopPoint) - Bus times status
- [BBC News Feed](http://feeds.bbci.co.uk/news/rss.xml) - News Feed
- [Cors Anywhere](https://cors-anywhere.herokuapp.com) - CORS proxy for News Feed
- ~[TransportAPI](https://www.transportapi.com) - Bus times.~ (no longer used)

### How to get Bus Stop ID
1. On [OpenStreetMap](https://www.openstreetmap.org/?layers=TD) zoom right in on a bus stop you're interested in
2. Click the bus stop node to reveal its tags on the left
3. Copy the `naptan:AtcoCode` code.


## Environment variables
```
REACT_APP_BUS_STOP_DATA=[{"id": "490000077E", "title": "My closest bus stop"},{"id": "490000077E", "title": "Towards Stratford station"}]
REACT_APP_ROAD_DATA=a12,a13
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
