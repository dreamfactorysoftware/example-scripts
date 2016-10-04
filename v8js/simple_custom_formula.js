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
