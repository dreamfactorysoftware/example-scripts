// Always remove some fields depending on the current role.
// API call returns 'tax_identifier' and 'date_of_birth' from the database.
// Before returning JSON content to the client, remove tax_identifier and date_of_birth.
// For this change to take effect, you have to enable modification of response in the Admin Console script editor.
// Check the box 'Allow script to modify request (pre-process) or response (post-process)'.

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
