const memoryCache = require('memory-cache');

/**
 * Set the server-side caching
 * @param {number} duration The caching duration in seconds
 */
const cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cachedBody = memoryCache.get(key);

        if (cachedBody) {
            res.send(cachedBody);

            return;
        } else {
            res.sendResponse = res.send

            res.send = (body) => {
                memoryCache.put(key, body, duration * 1000);
                res.sendResponse(body);
            };

            next();
        }
    }
};

module.exports = cache;