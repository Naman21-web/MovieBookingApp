const axios = require("axios");

const sendMail = (subject,recepientEmails,content) => {
    axios.post(process.env.NOTI_SERVICE + '/notiservice/api/v1/notifications',{
        subject,
        recepientEmails,
        content
    });
};

module.exports = {
    sendMail
}