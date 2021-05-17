const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const path = require("path");

require("dotenv").config();
console.log(process.env.PASSWORD); //{ path: path / "dot.env" }

//Middleware
app.use(express.static("../client/public"));
app.use(express.json());

//REQUEST
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public", "index.html"));
});

app.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "natsimbig@gmail.com", pass: process.env.PASSWORD },
  });

  const mailOptions = {
    from: req.body.email,
    to: "natsimbig@gmail.com",
    subject: `Message from ${req.body.email}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Success!!");
    }
  });
});

//Server PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
