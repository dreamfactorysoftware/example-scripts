// Count usage of a particular service, saving history in a database table.
// Each time a GET call is made on an API endpoint, write the transaction details to a 'TransactionHistory' table.
// Record the user name, application API key, and timestamp.

var payload = {

    user_name: platform.session.user.email,
    api_key: platform.session.api_key,
    timestamp: (new Date()).toString()
};

var result = platform.api.post("db/_table/TransactionHistory", {"resource": [payload]});

if (result.status_code !== 200) {

    throw(JSON.stringify(result.content.error.message));
}
