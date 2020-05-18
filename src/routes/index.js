const express = require('express');
const test = require('./test');

module.exports = class Routes {
    constructor(app) {
        if (app == null) throw new Error("You must provide an instance of express.");
        app.use('/api', test);
    }

}