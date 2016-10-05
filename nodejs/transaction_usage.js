// Count usage of a particular service, saving history in a database table.
// Each time a GET call is made on an API endpoint, write the transaction details to a 'TransactionHistory' table.
// Record the user name, application API key, and timestamp.

// To enable Node.js scripting, set the path to node in your DreamFactory .env file.
// This setting is commented out by default.
//
// DF_NODEJS_PATH=/usr/local/bin/node
//
// Use npm to install any dependencies. This script requires 'lodash.'
// Your scripts can call console.log to dump info to the log file in storage/logs.

var payload = {

    user_name: platform.session.user.email,
    api_key: platform.session.api_key,
    timestamp: (new Date()).toString()
};

platform.api.post("db/_table/TransactionHistory", {"resource": [payload]}, '', function(body, response){

    console.log(response.statusCode + " " + response.statusMessage);
    event.setResponse(JSON.parse(body), response.statusCode, 'applicaton/json');
});
