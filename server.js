var express = require('express');
var app = express();

const spawn = require("child_process").spawn;


// Parse URL-encoded bodies (as sent by HTML forms)
//app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// on the request to root (localhost:3000/)
app.get('/', function (req, res) {
    const pythonProcess = spawn('python',["image_grayscale.py", req.body.img]);
    pythonProcess.stdout.on('data', (data) => {
        // Do something with the data returned from python script
        res.send('<b>'+req.body.test+'</b> first express http server<br/><img src="data:image/jpeg;base64,'+data+'">');
    });
    pythonProcess.stderr.setEncoding('utf-8');
    pythonProcess.stderr.on('data', function(data) {
        //Here is where the error output goes
    
        console.log('stderr: ' + data);
        res.send('<b>ERROR</b>');
    });
});

// On localhost:3000/welcome
app.get('/welcome', function (req, res) {
    res.send('<b>Hello</b> welcome to my http server made with express');
});

// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(5000, function () {
    console.log('Example app listening on port 5000.');
});