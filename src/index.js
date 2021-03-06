const path = require("path");
const express = require("express");
const http = require("http");
const app = express();
var fetch = require("node-fetch");
var nodemailer = require("nodemailer");
var bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");
const port = process.env.PORT || 3000;
const pathJoin = path.join(__dirname, "../public");
const request = require("request");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const viewPath = path.join(__dirname, "../templates/");
app.set("view engine", "ejs");
app.set("views", viewPath);

app.use(express.static(pathJoin));
//ssl fix
app.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https')
    res.redirect('https://twfmade.ca'+req.url)
  else
    next() /* Continue to other routes if we're not redirecting */
})
//end of ssl fix
app.post("/captcha", function (req, res) {
 
  var VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRETKEY}&response=${req.body["g-recaptcha-response"]}`;
  return fetch(VERIFY_URL, { method: "POST" })
    .then((res) => res.json())
    .then((json) => {
     
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: "hi@twfmade.ca", // Change to your recipient
        from: "hi@twfmade.ca", // Change to your verified sender
        subject: "Email from twfmade",
        text: `email from ${req.body.email} wanted to know ${req.body.message}`,
        html: `email from ${req.body.email} wanted to know ${req.body.message}`,
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
          console.error(error.response.body);
        });
      res.redirect("/sent");
    });
});

app.get("/", async (req, res) => {
  res.render("index");
});

app.post("/sendEmail", async (req, res) => {
  console.log(req);
  
});

app.get("/contact", async (req, res) => {
  res.render("contact");
});

app.get("/sent", async (req, res) => {
  res.render("sent");
});

app.listen(port, () => {
  console.log("we running ok! on " + port);
});
