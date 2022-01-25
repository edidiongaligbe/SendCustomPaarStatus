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
 
async function send_mail(paarStatus){
    let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "eddyblog19_gmail.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});

