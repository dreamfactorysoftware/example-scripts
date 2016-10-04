var privateKey = 27;

// post.pre_process

function encode(key, value) {
    var result = "";
    for (i = 0; i < value.length; ++i) {
        result += String.fromCharCode(value.charCodeAt(i) + parseInt(key));
    }
    return result;
}

var lodash = require('lodash.min.js');

lodash._.each(event.request.payload.resource, function (record) {

    if (!record.ssn) {
        throw "Social Security Number is required!";
    }

    record.ssn = encode(privateKey, record.ssn);

});


// get.post_process

function decode(key, value) {
    var result = "";
    for (i = 0; i < value.length; ++i) {
        result += String.fromCharCode(value.charCodeAt(i) - parseInt(key));
    }
    return result;
}

var lodash = require('lodash.min.js');

lodash._.each(event.response.content.resource, function (record) {
    record.ssn = decode(privateKey, record.ssn || '');
});
