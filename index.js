console.log('Loading function');

var https = require('https');

var iftttEventName = 'YOUR EVENT NAME';
var iftttSecretKey = 'YOUR SECRET KEY';

var body = JSON.stringify({ value1: 'Hello from Lambda!' });

var options = {
    hostname: 'maker.ifttt.com',
    path: '/trigger/'
        + iftttEventName
        + '/with/key/'
        + iftttSecretKey,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length
    }
};

exports.handler = function(event, context) {
    https.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function(str) {
            console.log(str);
        });
        context.succeed(res.statusCode);
    }).write(body);
};
