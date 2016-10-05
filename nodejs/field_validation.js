// This script validates that certain fields are in the POST request when creating records.
// If not, an exception is thrown and 500 error returned to the client.
// If the script exits normally with no exception being thrown, then the records will be written to the database
// and the post-process script, if any, will be run.
// lodash.min.js is available by default. The file is located in storage/scripting directory of the DreamFactory installation.
// You can add your own scripts there and use require() to include them.

// To enable Node.js scripting, set the path to node in your DreamFactory .env file.
// This setting is commented out by default.
//
// DF_NODEJS_PATH=/usr/local/bin/node
//
// Use npm to install any dependencies. This script requires 'lodash.'
// Your scripts can call console.log to dump info to the log file in storage/logs.

// POST /api/v2/db/_table/account triggers script db._table.account.post.pre_process
// This script runs BEFORE records are written to the db.
// records are in array event.request.payload.resource.

var lodash = require("lodash");

if (event.request.payload.resource) {

    lodash._.each(event.request.payload.resource, function( record ) {

        if (!record.hasOwnProperty("annual_revenue")) {
            throw new Error('missing field annual_revenue');
        }
        if (record.annual_revenue <= 0) {
            throw new Error ('annual_revenue must be > 0');
        }
    });
}
