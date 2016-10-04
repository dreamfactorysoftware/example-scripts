// This script validates that certain fields are in the POST request when creating records.
// If not, an exception is thrown and 500 error returned to the client.
// If the script exits normally with no exception being thrown, then the records will be written to the database
// and the post-process script, if any, will be run.
// lodash.min.js is available by default. The file is located in storage/scripting directory of the DreamFactory installation.
// You can add your own scripts there and use require() to include them.

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
