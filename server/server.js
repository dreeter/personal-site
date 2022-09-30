const express = require('express');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use(express.static('client'));

app.listen(process.env.PORT || 3000, ()=> {
    console.log('App listening on port ' + port);
});

app.post("/message", (req, res)=> {

    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: "dreeter00@gmail.com",
            pass: 'app-passwordhere'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: "dreeter00@gmail.com",
        subject: req.body.subject,
        text: `${req.body.name} at ${req.body.email} says ${req.body.message}` 

    }

    transporter.sendMail(mailOptions, (err, success)=> {

        if(err) {
            res.status(500).send();
        } 

        if(success) {
            res.send();
        }
    })

});

app.get("/*", (req, res)=> {
    res.send("<h1> Error: 404 - Sorry I'm not sure what you're doing here... </h1>");
})