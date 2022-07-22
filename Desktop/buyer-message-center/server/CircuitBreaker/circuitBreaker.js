const Cache = require('../Cache');
function isCircuitBroken(domain) {
    let thresholdCounter = require('./thresholdCounter')(domain);
    let currentCounter = Cache.getCache(domain);

    if (currentCounter && currentCounter >= thresholdCounter) {
        return true;
    }
    else {
        return false;
    }
}
function update5XXCount(domain) {
    let thresholdCounter = require('./thresholdCounter')(domain);
    let currentCounter = Cache.getCache(domain);
    if (currentCounter && currentCounter < thresholdCounter) {
        Cache.setCache(domain, (currentCounter + 1), 60);
    }
    else {
        Cache.setCache(domain, 1, 60);
    }
}
module.exports = { isCircuitBroken: isCircuitBroken, update5XXCount: update5XXCount };

