const cron = require("node-cron");
const ShowSeat = require("../models/showSeat.model");
const Booking = require("../models/booking.model");

const mailerCron = () => {
    cron.schedule('0 * * * *', async () => {//Schedule cron after every 2 mins
        console.log("Executing cron again...");
        // const updatedSeats = await ShowSeat.updateMany(
        //     {
        //         status: "LOCKED",
        //         expiresAt: { $lt: new Date() }
        //     },
        //     {
        //         $set: {
        //             status: "AVAILABLE"
        //         },
        //         $unset: {
        //             lockedBy: "",
        //             lockedAt: "",
        //             expiresAt: ""
        //         }
        //     }
        // );
        // console.log(updatedSeats);
        Booking.updateMany(
            {
                status: "PENDING",
                createdAt: { $lt: new Date(Date.now() - 10 * 60 * 1000) }
            },
            {
                $set: { status: "FAILED" }
            }
        );
    })
};

module.exports = mailerCron;