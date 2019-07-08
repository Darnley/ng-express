const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const cache = require('./cache');
const clientSideCache = require('./cache');

require('dotenv').config();

const app = express();

app.use(require('morgan')('common'));

// Load the HTTP port
const APPLICATION_PORT = Number(process.argv[2]) || Number(process.env.PORT) || 443;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load security defaults
app.use(require('helmet')());

// Load compression package
app.use(require('compression')());

app.get('/healthcheck', (req, res) => res.status(200).json("healthy"));

// Only enable caching when environment is not development
if (app.get('env') !== 'development') {
    // Set server-side caching
    app.use(cache.middleware(process.env.SERVER_SIDE_CACHE_SECONDS || 15));

    // Set client-side caching
    cache.clientSideCache(app);
}

// Serve static files from app/dist folder
app.use(serveStatic(path.join(__dirname, 'dist'), { 'index': ['index.html'] }));

// Process all other requests to the index.hml file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(APPLICATION_PORT, () => {
    console.info(`Application started on port ${APPLICATION_PORT}`);
});