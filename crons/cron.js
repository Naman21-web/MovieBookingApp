const cron = require("node-cron");
const ShowSeat = require("../models/showSeat.model");

const mailerCron = () => {
    cron.schedule('*/2 * * * *', async () => {//Schedule cron after every 2 mins
        console.log("Executing cron again...");
        const updatedSeats = await ShowSeat.updateMany(
            {
                status: "LOCKED",
                expiresAt: { $lt: new Date() }
            },
            {
                $set: {
                    status: "AVAILABLE"
                },
                $unset: {
                    lockedBy: "",
                    lockedAt: "",
                    expiresAt: ""
                }
            }
        );
        // console.log(updatedSeats);
    })
};

module.exports = mailerCron;