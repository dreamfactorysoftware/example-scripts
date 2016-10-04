// Scramble social security numbers during development and testing.
// When a social security number is posted, "encrypt" (scramble the digits), then POST the randomized digits to the database.
//Then GET the social security number by decrypting the scrambled digits with a private key and
// returning the real social security number back to the client.
// For this change to take effect, you have to enable modification of response in the Admin Console script editor.
// Check the box 'Allow script to modify request (pre-process) or response (post-process)'.

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
