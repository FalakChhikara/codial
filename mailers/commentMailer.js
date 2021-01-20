const nodemailer = require("../config/nodeMailer");
const password = require("../password");
const nodemailer1 = require("nodemailer");

exports.newCommentMail = async (comment) => {
  nodemailer.transporter.sendMail(
    {
      from: password.EMAIL, // sender address
      to: comment.user.email, // list of receivers
      subject: "New Comment Published", // Subject line
      //   text: "Hello world?", // plain text body
      html: "<b>New Comment Published</b>", // html body
    },
    (err, info) => {
      if (err) {
        console.log("error in sending mail", err);
        return;
      }
      console.log("message sent", info);
      return;
    }
  );
};
