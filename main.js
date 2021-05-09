
const express = require('express');
const app = express();

const path = require('path');

require('dotenv').config();

app.use('/static', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/auth.html'));
})

app.listen(process.env.PORT, () => {
  console.log(`port: ${process.env.PORT}`);
})
