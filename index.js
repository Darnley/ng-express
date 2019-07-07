const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(express.static(path.join(__dirname, 'app/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/dist/index.html'));
});

app.listen(3000, () => {
    console.info('Listening application');
});