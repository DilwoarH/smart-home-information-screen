# SmartHome information screen

SmartHome is an information screen which displays useful information such as bus times, train line status and other information useful for modern day SmartHome.

## API credits
This application uses the following APIs:
- [https://www.transportapi.com/](TransportAPI) - Bus times.
- [https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status](Tfl train line status API) - Train line status.
- [https://api.tfl.gov.uk/road](Tfl road status API) - Road status

### How to get transport api key and app id
1. Register on [https://www.transportapi.com/](TransportAPI).
2. Create your first app.

### How to get Bus Stop ID
1. On [https://www.openstreetmap.org/?layers=TD](OpenStreetMap) zoom right in on a bus stop you're interested in
2. Click the bus stop node to reveal its tags on the left
3. Copy the `naptan:AtcoCode` code.


### Limits
- [https://www.transportapi.com/](TransportAPI) - 1000 requests/day - 30000/month

## Environment variables
```
REACT_APP_SECRET=somesecretstring

REACT_APP_TRANSPORT_APP_ID=
REACT_APP_TRANSPORT_API_KEY=
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
