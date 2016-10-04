// get.post_process

// check for your special role name that allows access

if (platform.session.role.name !== 'admin') {

    var lodash = require('lodash.min.js');

    lodash._.each(event.response.content.resource, function (record) {

        if (record.hasOwnProperty('tax_identifier')) {
            delete record.tax_identifier;
        }

        if (record.hasOwnProperty('date_of_birth')) {
            delete record.date_of_birth;
        }
    });
}
