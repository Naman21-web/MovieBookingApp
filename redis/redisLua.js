const LOCK_SEATS_LUA = `
    for i, key in ipairs(KEYS) do
        if redis.call("EXISTS", key) == 1 then
            return 0
        end
    end

    for i, key in ipairs(KEYS) do
        redis.call("SET", key, ARGV[1], "EX", ARGV[2])
    end

    return 1
`;

module.exports = LOCK_SEATS_LUA;