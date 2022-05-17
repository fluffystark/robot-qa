## Getting Started

Please download or clone the repository, `cd` to the root directory with the package.json file and install the node dependencies with npm:

    npm install

Once the modules have successfully installed you can fire up the local api with:

    node api/index.js

You can then run the application:

    npm start

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Unit tests
### `npm test`

### Restrictions and limitations

Due to some limitations with setting up the mock server.
I was not able to set the custom routes to be functional.
Most of the functionality will expect the API to return success and reflect the effect on the local data instead of what the API returns.