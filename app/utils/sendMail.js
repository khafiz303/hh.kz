const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sadirovhafiz06@gmail.com', // ваш email
        pass: 'fsxy kkml ebim apel' // ваш пароль от email
    }
});


function sendEmail(to , subject , text){
    // Опции письма
    const mailOptions = {
        from: 'sadirovhafiz06@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };
    transporter.sendMail(mailOptions, function(error , info) {
        if(error){
            console.log(error);
        }else{
            console.log('Email sent:' + info.response);
        }
})




}


module.exports= sendEmail



