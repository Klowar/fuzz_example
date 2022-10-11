// config-overrides.js


module.exports = function override(config, env) {
    // New config, e.g. config.plugins.push...
    const _config = {
        ...config,
        resolve: {
            ...config.resolve,
            fallback: {
                "fs": false,
                "path": false,
            }
        }
    };
    return _config;
}
