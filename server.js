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
    const paarStatus = req.body.paar;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'inquiry.customs@gmail.com',
          pass: '1a2b3c4d+'
        }
      });
      
      var mailOptions = {
        from: 'inquiry.customs@gmail.com',
        to: 'edidiong@redpagesconsulting.com',
        subject: 'Status of PAAR Inquiry',
        html: `<p>This is the status of your PAAR inquiry.</p><br/><p>Status: <b>${paarStatus}</b></p>`,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(500).send('Unable to send email');
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send('Email sent successfully');
        }
      });
});

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});

