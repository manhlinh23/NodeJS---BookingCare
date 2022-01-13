require('dotenv').config
import nodemailer from 'nodemailer'

let sendSimpleEmail = async (data) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Manh Linh 👻" <nmanhlinh2323@gmail.com>', // sender address
        to: data.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html:
            `
        <h3>Xin chào ${data.patientName},</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh</p>
        <p>Thông tin lịch khám:</p>
        <p><b>Thời gian: ${data.time}</b></p>
        <p><b>Bác sĩ: ${data.doctorName}</b></p>
        <p>Nhấn vào đường link dưới đây để xác nhận đặt lịch khám, xin cám ơn</p>
        <div><a href=${data.redirectLink} targer="_blank">Xác nhận</a></div>
        `
    });
}

module.exports = {
    sendSimpleEmail
}