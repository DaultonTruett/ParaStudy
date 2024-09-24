const nodemailer = require('nodemailer');
const hbs = require('handlebars');
const fs = require('fs');
const path = require('path');

const NODEMAILER_AUTH_EMAIL = process.env.NODEMAILER_AUTH_EMAIL;
const NODEMAILER_AUTH_PASS = process.env.NODEMAILER_AUTH_PASS;

 

const sendEmail = async(email, subject, payload, template) => {
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 587,
            secure: false,
            auth: {
                user: NODEMAILER_AUTH_EMAIL,
                pass: NODEMAILER_AUTH_PASS
            }
        });

        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = hbs.compile(source);
        const options = () => {
            return {
                from: NODEMAILER_AUTH_EMAIL,
                to: email,
                subject: subject,
                html: compiledTemplate(payload)
            };
        };

        // send mail
        transporter.sendMail(options(), (error, info) => {
            if (error){
                return error;
            }else{
                return res.status(200).json({
                    success: true,
                });
            }
        });
    }catch(error){
        return error;
    }
};

module.exports = sendEmail;