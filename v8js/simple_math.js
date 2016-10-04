
var params, required, n1, n2, resource, result;

var lodash = require("lodash.min.js");

if (event.request.method !== "GET") {
    throw("Only HTTP GET is allowed on this service.");
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
            throw( "Missing '" + element + "' in params\n" );
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
            throw("Divide by zero error.");
        }
        result = {"result": n1 / n2};
        break;
    default:
        throw("Invalid or missing resource name.");
        break;
}

return result;
