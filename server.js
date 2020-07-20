var express = require("express");
var app = express();
var fs = require("fs");

const spawn = require("child_process").spawn;
const PORT = 5000;

// Parse JSON bodies (as sent by API clients)
app.use(express.json({ limit: "50mb" }));

// On localhost:3000/welcome
app.get("/", function (req, res) {
  res.send("<b>Hello</b> welcome to my http server made with express");
});

// on the request to root (localhost:3000/)
app.post("/img", function (req, res) {
  var date = new Date();
  var largeData = [];
  console.log(
    `Request Accepted on ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  );

  fs.writeFile("img.jpg", req.body.img, { encoding: "base64" }, function (err) {
    console.log("image received");
    console.log("process image");
    // Call python script
    const pythonProcess = spawn("python", ["predict.py"]);
    // When data return
    pythonProcess.stdout.on("data", (data) => {
      console.log("process done");
      //split_data = data.toString().split("+++");
      // Do something with the data returned from python script
      largeData.push(data);
    });

    pythonProcess.stdout.on("close", () => {
      //split_data = data.toString().split("+++");
      // Do something with the data returned from python script
      console.log(largeData);
      console.log(
        "RESULT : ",
        largeData.join("").replace(/(\r\n|\n|\r)/gm, "")
      );
      console.log("sending result");
      // res.send(
      //   "<img src='data:image/jpeg;base64," +
      //     req.body.img +
      //     "'/><br/>" +
      //     largeData.join("")
      // );
      res.send(largeData.join(""));
    });
  });

  //When error
  // pythonProcess.stderr.setEncoding("utf-8");
  // pythonProcess.stderr.on("data", function (data) {
  //   //Here is where the error output goes
  //   console.log("stderr: " + data);
  //   //res.send("<b>ERROR</b>");
  // });
});

// Change the 404 message modifing the middleware
app.use(function (req, res, next) {
  res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(PORT, function () {
  console.log("Example app listening on port " + PORT + ".");
});
