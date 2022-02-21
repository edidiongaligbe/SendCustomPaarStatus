require(`dotenv`).config();
var nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const app = new express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded());
var corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions));

app.get('/', function (req, res) {
  res.send('Hi')
})

app.post('/api/sendpaar', function (req, res) {

  /* Route path: /users/:userId/books/:bookId
  Request URL: http://localhost:3000/users/34/books/8989 */

    
    let transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  
    const mailOptions = {
      from: "testingapps@zohomail.com", // sender address
      to: `${req.body.email}`,
      subject: "PAAR Query Status", // Subject line
      html: `<p>Hi,</p><p>The status of your PAAR query is <b>${req.body.paarstatus}</b></p>`, // plain text body
    };
  
    transporter.sendMail(mailOptions).then(()=>{
      res.status(200).send("Successful");
    }).catch((err)=>{
      console.log(err);
      res.status(500).send("Unsuccessful");
    });
    
});

async function sendPaarStatus(emailAddress, paarStatus){

}
 

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});

