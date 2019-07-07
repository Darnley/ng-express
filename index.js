const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');
const compression = require('compression');

const app = express();

dotenv.config();

// Load the HTTP port
const APPLICATION_PORT = Number(process.argv[2]) || Number(process.env.PORT) || 443;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load security defaults
app.use(helmet());

// Load compression package
app.use(compression());

// Serve static files from app/dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Process all other requests to the index.hml file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(APPLICATION_PORT, () => {
    console.info(`Application started on port ${APPLICATION_PORT}`);
});