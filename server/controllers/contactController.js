import nodemailer from "nodemailer";
const queryMail = async (req,res) => {
    let {fullname,email,query} = req.body;
    console.log(fullname,email,query)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    var mailOptions = {
        from: email,
        replyTo: email,
        to: process.env.EMAIL,
        subject: fullname + " sent you a message",
        text: query
    }
    transporter.sendMail(mailOptions, function(err, info) {
        return res.status(200).json({status:'okay'});
    })
    // return res.status(500).json({"error":"Internal Server Error"})
}

export {queryMail};