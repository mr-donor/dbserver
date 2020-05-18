const graphqlHTTP = require('express-graphql');
const router = require('express').Router();
const DB = require('../database');

router.get('/', (req, res) => {
	let id = DB.find(1);
	id.then((data) => {
		console.dir(data);
	});
	res.send(id);
});

module.exports = router;