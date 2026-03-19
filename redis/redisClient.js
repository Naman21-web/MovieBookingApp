const { createClient } = require('redis');
require('dotenv').config(); // .env फ़ाइल से URL लोड करने के लिए

const client = createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err) => console.error('Redis Client Error:', err));

const connectRedis = async () => {
    try {
        if (!client.isOpen) {
            await client.connect();
            console.log('Connected to Redis Cloud!');
        }

        await client.set('framework', 'Node.js');
        const value = await client.get('framework');
        console.log(`The value of 'framework' is: ${value}`);

        return client;
    } catch (err) {
        console.error('Failed to connect or operate:', err);
        throw err; 
    }
};

module.exports = { connectRedis, client };