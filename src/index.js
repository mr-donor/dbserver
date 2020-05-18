const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const Routes = require('./routes');
const config = require('config');

class App {
	constructor() {
		this.express = express();
		this.config  = {
			get port() {
                return config.get('app.server.port') || 8080;
            }
		};
		this.route = this.middleware();
	}

	middleware() {
		let accessLog = fs.createWriteStream(path.join(__dirname, '../log/access.log'), {flags : 'a'});  
    	let errorLog = fs.createWriteStream(path.join(__dirname, '../log/error.log'), {flags : 'a'}); 
        this.express.use(morgan('dev', {
  			skip: (req, res) => { return res.statusCode < 400 },
  			steam: errorLog
		}));
		this.express.use(morgan('common', {
			stream: accessLog
		}));
        this.express.use(bodyParser.json());
        this.router = new Routes(this.express);
    }

    run() {
		this.express.listen(this.config.port, () => {
            console.log("Express server running project on port " + this.config.port + ".");
            console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
        })
    }

}

new App().run();