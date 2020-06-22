var express = require("express");
var app = express();

const spawn = require("child_process").spawn;
const PORT = 5000;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// On localhost:3000/welcome
app.get("/", function (req, res) {
  res.send("<b>Hello</b> welcome to my http server made with expressVPN");
});

// on the request to root (localhost:3000/)
app.post("/img", function (req, res) {
  //console.log(req.body);
  console.log("Request Accepted");
  // Call python script
  const pythonProcess = spawn("python", ["image_grayscale.py", req.body.img]);

  // When data return
  pythonProcess.stdout.on("data", (data) => {
    split_data = data.toString().split("+++");
    // Do something with the data returned from python script
    // res.send(
    //   `
    //   <b>GAMBAR<b/><br/><img src="data:image/jpeg;base64,${split_data[0]}"><br/> 
    //   <b>WIDTH : <b/> ${split_data[1]}<br/> 
    //   <b>HEIGHT : <b/> ${split_data[2]}<br/>
    //   `
    // );
    res.send("SUCCESS");
  });

  //When error
  pythonProcess.stderr.setEncoding("utf-8");
  pythonProcess.stderr.on("data", function (data) {
    //Here is where the error output goes
    console.log("stderr: " + data);
    res.send("<b>ERROR</b>");
  });
});

// Change the 404 message modifing the middleware
app.use(function (req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(PORT, function () {
  console.log("Example app listening on port " + PORT + ".");
});
