const redis = require('redis');

const redis_client = redis.createClient({
    legacyMode: true,
});

module.exports = redis_client;