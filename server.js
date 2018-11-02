var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var stringifyFile;

app.use(bodyParser.json());

app.use('/', (req, res, next) => {
	fs.readFile('./test.json', 'utf8', (err, data) => {
    	if (err) throw err;
    	stringifyFile = data;
	});
	next();
});

app.get('/getNote', (req, res) => {
   	res.send(stringifyFile);
});

app.post('/updateNote/:note', (req, res) => {
    	stringifyFile = stringifyFile + req.params.note;
		fs.writeFile('./test.json', stringifyFile, (err) => {
			if (err) throw err;
			console.log('File updated!');
		});
});


app.listen(3000);