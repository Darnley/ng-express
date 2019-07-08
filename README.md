# NgExpress

Basic ready for production Angular application with ExpressJs server render

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install NgExpress.

It is not a installable package. You must download it in a ZIP file and unpack in your favorite folder.

## Usage

### Development environment
First of all, rename the `.env.example` file to `.env`. It will be used as an application configuration file. In the production environment, you are supposed to overwrite those configurations.

In development environment you can just run the following command in NgExpress root folder. It will install all the dependencies for NgExpress and the Angular application inside `/app` folder.

```bash
npm install
```

If you would like to run the application watching its changes, just run the following command. It will also run `npm install`.

```bash
npm start
```

### Production environment
This package is ready for Docker. If you build the image and run the container, the application is ready for usage.

If you would like to publish the code yourself, just run the following command in the application's root folder.

```bash
npm run prod
```

It will compile the Angular application into `/dist` folder in production mode. After that, you are free to delete `/app` folder in production environment to reduce disk usage.

After compiling your Angular application, change the `NODE_ENV` in your environment variables or in `.env` file to `production`. It will enable the application caching (in `cache.js` file).

Last of all, execute the application using you Node.js runtime.

```bash
node ./index.js
```

The Dockerfile uses [PM2](http://pm2.keymetrics.io) to manage the Node.js process. You are free to use another process manager.

## Using another Angular application
This package is delivered with a standard and basic Angular application. If you would like to use your already existent Angular application, just follow these steps:

- Remove all the files from `/app` folder
- Copy your existent Angular application or create a new one in `/app` folder
- In `angular.json` file, change the `outputPath` parameter value to `../dist`
- In `package.json` file, add the following script in `scripts` object
```json
"build:watch": "ng build --watch=true"
```

That is all.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
