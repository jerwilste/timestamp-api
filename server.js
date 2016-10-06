var express = require('express');
var moment = require('moment');
var app = express();
var path = require('path');
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
app.get('/', function(req, res){
	console.log(req.url);
	//res.send('Hello World! hotfix');
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/:date', function(req, res){
	console.log('user requested:' +req.params.date);
	var validatorN = moment(req.params.date.replace(',',''), 'MMMM DD YYYY', true).isValid();
	var validatorU = moment(req.params.date, ['x','X'],true).isValid();
	var fd; 
	var d = moment(req.params.date);
	var dN, dU;
	if (validatorN === true || validatorU === true) { //need conditional logic to start at Epoch date when receiving unix timestamp (no negative value)
		if (validatorN === false){
//			dU = new Date(req.params.date);
//			if (d.unix() < 0){
				dU = new Date(0); dU = dU.setMilliseconds(req.params.date);
				d = moment(dU); 		
//			}
//			else dU = d.unix()*1000;
		}
		fd  = {
				natural: d.format('MMMM DD YYYY'),
				unix: dU 
		}
	}
	else {
		fd = {
			natural: null,
			unix: null
		}
	}	
	res.send(JSON.stringify(fd));
});
app.listen('8080', function(){console.log('app listening on 8080');});
