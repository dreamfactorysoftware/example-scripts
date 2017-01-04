<?php

$api = $platform['api'];
$get = $api->get;
$post = $api->post;
$put = $api->put;
$patch = $api->patch;
$delete = $api->delete;

$api_path = 'db/_table/todo'; //the service/_table/tablename you wish to obfuscate
$method = $event['request']['method']; //get the HTTP Method
$options['parameters'] = $event['request']['parameters'];

if ( $event['resource'] && $event['resource'] != '' ) {
  $api_path = $api_path . '/' . $event['resource'];
}

if ( $event['request']['payload'] ) {
  $payload = $event['request']['payload'];
} else {
  $payload = null;
}

switch ( $method ) {
  case 'GET':
    $result = $get ( $api_path, $payload, $options );
    break;
  case 'POST':
    $result = $post ( $api_path, $payload, $options );
    break;
  case 'PUT':
    $result = $put ( $api_path, $payload, $options );
    break;
  case 'PATCH':
    $result = $patch ( $api_path, $payload, $options );
    break;
  case 'DELETE':
    $result = $delete ( $api_path, $payload, $options );
    break;
  default:
    $result['message'] = 'Cannot interpret this call. Invalid verb.';
    break;
}

return $result;

?>
