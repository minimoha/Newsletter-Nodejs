const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){
    let email = req.body.email;
    let fname = req.body.firstname;
    let lname = req.body.lastname;

    console.log(email, fname, lname);

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    let options = {
        url: "https://us19.api.mailchimp.com/3.0/lists/281f22a4ca",
        method: "POST",
        headers: {
            "Authorization": "mamud 768e24097b20b3c79e844d357aa2bd3c-us19"
        },
        body: jsonData
    }

    request(options, function(error, response, body) {
        if(error) {
            res.sendFile(__dirname + "/failure.html");
            
        } else {
            if(response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
            
        }

    });
});

app.post("/failure", function(req, res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});


//768e24097b20b3c79e844d357aa2bd3c-us19
//281f22a4ca