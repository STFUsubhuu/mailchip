const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("file"));
app.use(bodyparser.urlencoded({extended : true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.Fname;
  const secondName = req.body.Sname;
  const email = req.body.Lname;

  const data = {
    members : [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: secondName
        }
      }
    ]
  };

const jasonData = JSON.stringify(data);
const url = "https://us13.api.mailchimp.com/3.0/lists/971dab3f18"
const options = {
  method: "POST",
  auth: "subhu:54b2ebd7131cf0a7b4336c3954459333-us13."
}

app.post("/fail", function(req, res){
  res.redirect("/");
});


const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname +"/sucess.html");
    }else{
      res.sendFile(__dirname +"/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
});

 request.write(jasonData);
 request.end();

});

app.listen(process.rev.PORT || 2000, function(){
  console.log("Your server started");
});


// API KEY
// 54b2ebd7131cf0a7b4336c3954459333-us13
//list // I:
 // 971dab3f18
