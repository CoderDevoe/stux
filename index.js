// core modules
const http = require('http');
const { join, resolve } = require('path');

// 3rd party modules
const express = require('express');
const routeLabel = require('route-label');

// Import module in global scope
require('app-module-path').addPath(__dirname + '/app/modules');
require('dotenv').config();

config = require(resolve(join(__dirname, 'app', 'config')));

const app = express();
const namedRouter = routeLabel(app);

// express locals instance
app.locals.moment = require('moment');

/* function and variable declaration */
global.generateUrl = generateUrl = (route_name, route_param = {}) => namedRouter.urlFor(route_name, route_param);
const getPort = config.getPort;
const getApiFolderName = config.getApiFolderName;
global.BASE_URL = `http://${process.env.HOST}:${getPort}`;

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
    const port = getPort;
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(0);
            break;
        default:
            throw error;
    }
}

(() => {
	
})();