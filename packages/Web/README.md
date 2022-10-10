
# Bink Web

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Analyzing the Bundle Size

To analyze the bundle run
```shell
npm run build
npm run analyze
```
[read more](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

##Use a specific theme

By default commands will run using the `bink` theme.
A different theme can be specified by setting the `THEME` env variable (e.g.`THEME=wasabi npm start`)

This will have multiple effects
 - the config files under `/binkConfig` will be used to define behaviour. These are managed by the NPM [config](https://github.com/lorenwest/node-config) library.
 - SASS will have an alias `~sassThemeFolder` which will match the appropriate folder during imports (e.g. `src/sass/themes/wasabi`).
   This should be used mainly to override theme specific variables.  


##Build for a specific environment 

When running `npm start` the `development` env will be assumed.\
When running `npm run build` the `production` env will be assumed.

To specify a specific environment or theme when building, run `NODE_CONFIG_ENV={environment} THEME={theme} npm run build`.

To run a build for `uat` env there is a script in `package.json`
```json
"scripts": {
  ...,
  "uat": "NODE_CONFIG_ENV=uat node scripts/build.js"
}
```

The React bundle build optimization will be `production` like. The app config values though will be read from the `/binkConfig/uat.js(on)?` file
