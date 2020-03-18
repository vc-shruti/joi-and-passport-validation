import nodeMailer from "nodemailer";

module.exports = async function sendEmails(params, callback) {
  try {
    //create the transporter using SMTP transport
    let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      auth: {
        user: "ramsolanki.viitorcloud@gmail.com",
        pass: "rryvipyvhumukvzv"
      }
    });
    console.log(transporter);
    params.from = "ramsolanki.viitorcloud@gmail.com";
    console.log(params);
    transporter.sendMail(params, (err, info) => {
      if (err) {
        callback(err, []);
      }
      if (info) {
        callback(undefined, info);
      }
    });
  } catch (err) {
    console.log(err);
    callback(err, []);
  }
};
