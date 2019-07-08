const memoryCache = require('memory-cache');

const cache = {
    /**
     * Set the server-side caching
     * @param {number} duration The caching duration in seconds
     */
    middleware: (duration) => {
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
    },
    /**
     * Set the client-side caching (js, css, html and image files)
     * @param {any} app Express app
     */
    clientSideCache: (app) => {
        // Set client-side caching
        app.use('*.js|*.css', (req, res, next) => {
            // Set caching js and css files in seconds
            res.set('Cache-Control', `public, max-age=${process.env.CLIENT_SIDE_CACHE_SECONDS || 31557600}`);
            next();
        });

        app.use('*.html|*.htm|*.png|*.jpg|*.svg|*.gif', (req, res, next) => {
            // Set caching html and image files
            res.set('Cache-Control', `public, max-age=${process.env.CLIENT_SIDE_HTML_N_IMAGES_CACHE_SECONDS || 600}`);
            next();
        });
    }
};

module.exports = cache;