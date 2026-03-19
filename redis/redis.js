const LOCK_SEATS_LUA = require("./redisLua");
const {client} = require("./redisClient");
const { STATUS } = require("../utils/constants");

const lockSeatsRedis = async (showId, seatNumbers, bookingId) => {
    const lockedSeats = [];

    for (let seat of seatNumbers) {
        const key = `seat_lock:${showId}:${seat}`;

        const result = await client.set(key, bookingId.toString(), {
                                NX: true,       // Only set if key does not exist
                                EX: 300         // Expire in 300 seconds (5 minutes)
                            });

        if (result === "OK") {
            lockedSeats.push(seat);
        } else {
            for (let s of lockedSeats) {
                await client.del(`seat_lock:${showId}:${s}`);
            }

            throw {
                err: "Some seats are already booked ",
                code: STATUS.BAD_REQUEST
            }
        }
    }

    return lockedSeats;
};

const getLockedSeats = async (showId) => {
    const pattern = `seat_lock:${showId}:*`;
    let cursor = "0";
    const lockedSeats = [];

    do {
        const { cursor: nextCursor, keys } = await client.scan(
            cursor,
            {
                MATCH: pattern,
                COUNT: 100
            }
        );

        cursor = nextCursor;

        keys.forEach(key => {
            const seat = key.split(":")[2];
            lockedSeats.push(seat);
        });

    } while (cursor !== "0");

    return lockedSeats;
};

const checkBooking = async (showId, seatNumbers, bookingId) => {
    for (let seat of seatNumbers) {
        const key = `seat_lock:${showId}:${seat}`;
        const value = await client.get(key);

        if (value !== bookingId) {
            throw {
                err: "Time expired or invalid booking",
                code: STATUS.TIMEOUT
            }                
        }
    }

};

const confirmBooking = async (showId, seatNumbers) => {
    // release locks
    for (let seat of seatNumbers) {
        await client.del(`seat_lock:${showId}:${seat}`);
    }
};

module.exports = {
    lockSeatsRedis,
    getLockedSeats,
    checkBooking,
    confirmBooking
}