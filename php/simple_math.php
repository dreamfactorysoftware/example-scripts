// You can create any number of scripting services and invoke them from the REST API.
// In this example, we'll create a simple service named 'math' that accepts two numbers
// as query parameters and returns the result as JSON.
// Since the script is a service, you can control access to it using roles.
// The script has whatever access to the API that is allowed by the role of the user calling the script.
// If allowed, the script can make additional REST API calls or cURL requests.

$verb = $event['request']['method'];

if($verb !== 'GET'){
    throw new \DreamFactory\Core\Exceptions\BadRequestException('Only HTTP GET is allowed on this endpoint.');
}

// get resource, /math —> "", /math/add —> "add"
$resource = $event['resource'];

// get query params from request
$params = $event['request']['parameters'];

$required = ['n1', 'n2'];

if(!empty($resource)){
    foreach($required as $element){
        if(!isset($params[$element])){
            throw new \DreamFactory\Core\Exceptions\BadRequestException('Missing '.$element.' in params.');
        }
    }
    $n1 = $params['n1'];
    $n2 = $params['n2'];
}

switch ($resource) {
    case "":
        // /math means return all supported resources
        $result = ['resource' => ['add', 'subtract', 'multiply', 'divide']];
        break;
    case "add":
        $result = ['result' => ($n1 + $n2)];
        break;
    case "subtract":
        $result = ['result' => ($n1 - $n2)];
        break;
    case "multiply":
        $result = ['result' => ($n1 * $n2)];
        break;
    case "divide":
        if (!$n2) {
            throw new \DreamFactory\Core\Exceptions\BadRequestException('Divide by zero error.');
        }
        $result = ['result' => ($n1 / $n2)];
        break;
    default:
        throw new \DreamFactory\Core\Exceptions\BadRequestException('Invalid or missing resource name.');
        break;
}

return $result;
