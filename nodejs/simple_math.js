// You can create any number of scripting services and invoke them from the REST API.
// In this example, we'll create a simple service named 'math' that accepts two numbers
// as query parameters and returns the result as JSON.
// Since the script is a service, you can control access to it using roles.
// The script has whatever access to the API that is allowed by the role of the user calling the script.
// If allowed, the script can make additional REST API calls or cURL requests.

// To enable Node.js scripting, set the path to node in your DreamFactory .env file.
// This setting is commented out by default.
//
// DF_NODEJS_PATH=/usr/local/bin/node
//
// Use npm to install any dependencies. This script requires 'lodash.'
// Your scripts can call console.log to dump info to the log file in storage/logs.

var params, required, n1, n2, resource, result;

var lodash = require("lodash");

if (event.request.method !== "GET") {
    throw new Error("Only HTTP GET is allowed on this service.");
}

// get query params from request
params = event.request.parameters;

// get resource, /math —> "", /math/add —> "add"
resource = event.resource;
if (resource !== "") {
    // check for required params
    required = ["n1","n2"];
    lodash._.each( required, function( element ) {
        if (!params.hasOwnProperty(element) || !params[element]) {
            throw new Error( "Missing '" + element + "' in params\n" );
        }
    });
    n1 = Number(params.n1);
    n2 = Number(params.n2);
}

switch (resource) {
    case "":
        // /math means return all supported resources
        result = {"resource": ["add", "subtract", "multiply", "divide"]};
        break;
    case "add":
        result = {"result": n1 + n2};
        break;
    case "subtract":
        result = {"result": n1 - n2};
        break;
    case "multiply":
        result = {"result": n1 * n2};
        break;
    case "divide":
        if (!n2) {
            throw new Error("Divide by zero error.");
        }
        result = {"result": n1 / n2};
        break;
    default:
        throw new Error("Invalid or missing resource name.");
        break;
}

return result;
