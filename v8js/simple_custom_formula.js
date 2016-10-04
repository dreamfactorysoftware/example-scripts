// Make a field automatically be a mathematical result.
// Return 'total' as JSON key with value 'price' * 'tax_rate'.
// price and tax_rate are stored in a database, total is not.

This is a post process script that alters the response.

For this change to take effect, you have to enable modification of response in the Admin Console script editor. Check the box 'Allow script to modify request (pre-process) or response (post-process)'.



var lodash = require('lodash.min.js');

lodash._.each(event.response.content.resource, function (record) {

    if (!record.tax) {

        throw "Tax is required!";
    }

    if (!record.price) {

        throw "Price is required!";
    }

    record.total = (parseFloat(record.tax) * parseFloat(record.price) / 100) + parseFloat(record.price);
});
