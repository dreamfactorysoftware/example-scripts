// If you have Node.js scripts that need to call back into the API, you can do it like this.
// In this simple example, the script queries the db service 'todo' table and returns the result.

// To enable Node.js scripting, set the path to node in your DreamFactory .env file.
// This setting is commented out by default.
//
// DF_NODEJS_PATH=/usr/local/bin/node

platform.api.get('/db/_table/todo', '', function(body, response){
    event.setResponse(JSON.parse(body), response.statusCode, 'applicaton/json');
});
