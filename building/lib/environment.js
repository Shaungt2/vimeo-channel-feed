"use strict";

var ENV_DEVELOPMENT = "development";
var ENV_PRODUCTION  = "production";
var ENV_DEFAULT     = ENV_DEVELOPMENT;

var curEnv = process.env.NODE_ENV || ENV_DEFAULT;

module.exports = {
    DEFAULT      : ENV_DEFAULT,
    DEVELOPMENT  : ENV_DEVELOPMENT,
    PRODUCTION   : ENV_PRODUCTION,
    current      : curEnv,
    isDevelopment: curEnv === ENV_DEVELOPMENT,
    isProduction : curEnv === ENV_PRODUCTION
};
