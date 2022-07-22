const thresholdCounter_PROD_ENV = {
    'related.imutils.com': 100,

}
const thresholdCounter_STG_ENV = {
    'related.imutils.com': 100,

}
const thresholdCounter_DEV_ENV = {
    'related.imutils.com': 100,

}
function getThreshold(domain) {
    if ((process.env.NODE_ENV_M == 'prod') || (typeof (process.env.NODE_ENV_M) == 'undefined')) {
        return thresholdCounter_PROD_ENV[domain];
    }
    else if (process.env.NODE_ENV_M == 'stg') {
        return thresholdCounter_STG_ENV[domain];
    }
    else {
        return thresholdCounter_DEV_ENV[domain];
    }
}
module.exports = getThreshold;