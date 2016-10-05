// This script uses a pre-configured push notification service to send notifications when new records are created.
// lodash.min.js is available by default. The file is located in storage/scripting directory of the DreamFactory installation.
// You can add your own scripts there and use require() to include them.

// To enable Node.js scripting, set the path to node in your DreamFactory .env file.
// This setting is commented out by default.
//
// DF_NODEJS_PATH=/usr/local/bin/node
//
// Use npm to install any dependencies. This script requires 'lodash'.
// Your scripts can call console.log to dump info to the log file in storage/logs.

// POST /api/v2/db/_table/todo triggers script db._table.todo.post.post_process
// This script runs AFTER records are written to the db.
// records are in array event.request.payload.resource.

var lodash = require("lodash");

if (event.request.payload.resource) {

    lodash._.each(event.request.payload.resource, function( record ) {

        var msg = {
            "Message": {
                "default": "A new Todo named '" + record.name + "' was just created!"
            },
            "Subject": "New Todo Created - " + record.name
        };

        platform.api.post('/push/topic/arn:aws:sns:us-east-1:xxxxxxxx:new_todo', msg, '', function(body, response){
            console.log(body);
        });
    });
}
