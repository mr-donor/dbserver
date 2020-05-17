const express = require('express');

module.exports = class Routes {
    constructor(app) {
        if (app == null) throw new Error("You must provide an instance of express.");
        app.use('/api', (req, res) => {
        	res.send('route');
        });
    }

}