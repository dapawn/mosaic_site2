const functions = require("firebase-functions");
const admin = require('firebase-admin');
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

admin.initializeApp();


//to make it work you need gmail account
//Dont Forget: firebase functions:config:set gmail.login=yourlogin@gamail.com gmail.pass=yourpass

exports.emailMessage = functions.https.onRequest((req, res) => {
  const { name, email, phone, message } = req.body;
  return cors(req, res, () => {
    var text = `<div>
      <h4>Information</h4>
      <ul>
        <li> Name - ${name || ""} </li>
        <li> Email - ${email || ""} </li>
        <li> Phone - ${phone || ""} </li>
      </ul>
      <h4>Message</h4>
      <p>${message || ""}</p>
    </div>`;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "mosaicphilly",
        pass: "homeschoolpassword"
      }
    });

    const mailOptions = {
      to: "dapawn@mgmail.com",
      from: "no-reply@mosaicphilly.com",
      subject: `Testing...`,
      text: req.body.text,
      html: text
    };
    
    transporter.sendMail(mailOptions, function(error, info){
     if(error){ console.log(error.message); }
     res.status(200).send({ message: "success" })
    });
  }).catch(() => { res.status(500).send("error"); });
});

