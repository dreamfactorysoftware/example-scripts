var api_path = 'db/_table/todo'; //the service/_table/tablename you wish to obfuscate
var method = event.request.method; //get the HTTP Method
var options = {}; //create an empty object for params and headers
options.parameters = event.request.parameters; //copy params from the request to the options object
var result; //create the result var (to be returned by the script)

if (event.resource && event.resource !== '') { //if there are additional resources in the request path add them to our request path
    api_path = api_path + '/' + event.resource;
}

if (event.request.payload) { //if the payload is not empty assign it to the payload var
    var payload = event.request.payload;
} else { //else make the payload null
    var payload = null;
}

switch (method) { //Cases used to determine which verb to use when making our api call
    case 'GET':
        result = platform.api.get(api_path, payload, options);
        break;
    case 'POST':
        result = platform.api.post(api_path, payload, options);
        break;
    case 'PUT':
        result = platform.api.put(api_path, payload, options);
        break;
    case 'PATCH':
        result = platform.api.patch(api_path, payload, options);
        break;
    case 'DELETE':
        result = platform.api.delete(api_path, payload, options);
        break;
    default: //if none of the previous cases match something has gone horribly wrong
        result = {"message":"Cannot interpret this call. Invalid verb."};
        break;
}

return result; //return the data response to the client
