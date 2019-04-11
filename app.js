const express = require('express')
const app = express()
const http = require('http')
const mongoConnect = require('./util/database').mongoConnect;

const server = http.createServer(app)

//Connect to database
mongoConnect(() => {
    server.listen(process.env.PORT || 8080, () => {
        console.log('Listening on port 8080');
    });
});