// POST /api/v2/db/_table/account triggers script db._table.account.post.pre_process
// This script runs BEFORE records are written to the db.
// records are in array event.request.payload.resource.

var lodash = require("lodash.min.js");

if (event.request.payload.resource) {

    lodash._.each(event.request.payload.resource, function( record ) {

        if (!record.hasOwnProperty("annual_revenue")) {
            throw 'missing field annual_revenue';
        }
        if (record.annual_revenue <= 0) {
            throw 'annual_revenue must be > 0';
        }
    });
}
