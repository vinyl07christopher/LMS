const nodemailer = require("nodemailer");

const name = "jeeva";
// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "jeevanantham.iro@gmail.com",
    pass: "jltllwuzvwypcbqu",
  },
});

// Send email using Nodemailer
const sendMail = () => {
  const mailOptions = {
    from: "Leave Management System <jeevanantham.iro@gmail.com>",
    to: "jeevanantham052001@gmail.com, vinyl.ejesra@gmail.com",
    subject: `New Leave Application Recived ${name}`,
    text: "This is a test email from Nodemailer.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

