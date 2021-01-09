const express = require('express');
const app = express();
const path = require('path');

const foreceSSL = function() {
	return function(req, res, next) {
		if (req.headers['x-forwarded-proto'] !== 'https') {
			return res.redirect(
				['https://', req.get('Host'), req.url].join('')
			);
		}
		next();
	}
}

app.use(express.static(__dirname + '/dist/client-family-expense-tracker'));

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname + '/dist/client-family-expense-tracker/index.html'));
});

app.listen(process.env.PORT || 8080);