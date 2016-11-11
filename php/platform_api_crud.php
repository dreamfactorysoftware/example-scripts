<?php

$payload = "{\"resource\":[{\"name\":\"test\",\"complete\":false}]}";

// use the options arg to set auth and content-type headers for external calls
// external calls use cURL and require these headers to be set
$options = [];
$options['headers'] = [];
$options['headers']['X-DreamFactory-Api-Key'] = $platform['session']['api_key'];
$options['headers']['X-DreamFactory-Session-Token'] = $platform['session']['session_token'];
$options['headers']['Content-Type'] = 'application/json';

// create a record using internal URL such as db/_table/todo
// post(url, payload, <options>)
// internal URL must start with a service name
// payload must be an associative array
// options will be NULL because no auth or content-type headers are required for internal calls
$api = $platform["api"];
$post = $api->post;
$url = 'db/_table/todo';
$result = $post($url, json_decode($payload, true));
var_dump($result);
if (array_key_exists("error", $result["content"])) {
    throw new \Exception("error code = " . $result["content"]["error"]["code"] . ", messsage = " . $result["content"]["error"]["message"]);
}
var_dump('internal URL created ' . count($result["content"]["resource"]) . ' records');

$id1 = $result["content"]["resource"][0]["id"];

// create a record using external URL such as http://localhost:8080/api/v2/db/_table/todo
// post(url, payload, <options>)
// external URL must be a full URL
// payload must be stringified JSON
// options includes auth and payload type headers
$api = $platform["api"];
$post = $api->post;
$url = 'http://localhost:8080/api/v2/db/_table/todo';
$result = $post($url, $payload, $options);
var_dump($result);
if (array_key_exists("error", $result["content"])) {
    throw new \Exception("error code = " . $result["content"]["error"]["code"] . ", messsage = " . $result["content"]["error"]["message"]);
}
var_dump('external URL created ' . count($result["content"]["resource"]) . ' records');

$id2 = $result["content"]["resource"][0]["id"];

// get records using internal URL such as db/_table/todo
// get(url, payload, <options>)
// internal URL must start with a service name
// payload is usually NULL, but doesn't have to be
// options will be NULL because no auth or content-type headers are required for internal calls
$api = $platform["api"];
$get = $api->get;
$url = 'db/_table/todo';
$result = $get($url);
var_dump($result);
if (array_key_exists("error", $result["content"])) {
    throw new \Exception("error code = " . $result["content"]["error"]["code"] . ", messsage = " . $result["content"]["error"]["message"]);
}
var_dump('internal URL found ' . count($result["content"]["resource"]) . ' records');

// get records using external URL such as http://localhost:8080/api/v2/db/_table/todo
// post(url, payload, <options>)
// external URL must be a full URL
// payload is usually NULL, but doesn't have to be
// external calls use cURL and require that options include auth headers and payload type
$api = $platform["api"];
$get = $api->get;
$url = 'http://localhost:8080/api/v2/db/_table/todo';
// payload is null, but required to add options as third arg
$result = $get($url, NULL, $options);
var_dump($result);
if (array_key_exists("error", $result["content"])) {
    throw new \Exception("error code = " . $result["content"]["error"]["code"] . ", messsage = " . $result["content"]["error"]["message"]);
}
var_dump('external URL found ' . count($result["content"]["resource"]) . ' records');

// update a record using internal URL such as db/_table/todo
// patch(url, payload, <options>)
// internal URL must start with a service name
// payload must be an associative array
// options will be NULL because no auth or content-type headers are required for internal calls
$api = $platform["api"];
$patch = $api->patch;
$url = 'db/_table/todo/' . $id1;
$result = $patch($url, json_decode($payload, true));
var_dump($result);
if (array_key_exists("error", $result["content"])) {
    throw new \Exception("error code = " . $result["content"]["error"]["code"] . ", messsage = " . $result["content"]["error"]["message"]);
}
var_dump('internal URL updated 1 record');

// update a record using external URL such as http://localhost:8080/api/v2/db/_table/todo
// patch(url, payload, <options>)
// external URL must be a full URL
// payload must be stringified JSON
// external calls use cURL and require that options include auth headers and payload type
$api = $platform["api"];
$patch = $api->patch;
$url = 'http://localhost:8080/api/v2/db/_table/todo/' . $id2;
$result = $patch($url, $payload, $options);
var_dump($result);
if (array_key_exists("error", $result["content"])) {
    throw new \Exception("error code = " . $result["content"]["error"]["code"] . ", messsage = " . $result["content"]["error"]["message"]);
}
var_dump('external URL updated 1 record');

// delete a record using internal URL such as db/_table/todo
// delete(url, payload, <options>)
// internal URL must start with a service name
// payload is usually NULL, but doesn't have to be
// options will be NULL because no auth or content-type headers are required for internal calls
$api = $platform["api"];
$delete = $api->delete;
$url = 'db/_table/todo/' . $id1;
$result = $delete($url);
var_dump($result);
if (array_key_exists("error", $result["content"])) {
    throw new \Exception("error code = " . $result["content"]["error"]["code"] . ", messsage = " . $result["content"]["error"]["message"]);
}
var_dump('internal URL deleted 1 record');

// delete a record using external URL such as http://localhost:8080/api/v2/db/_table/todo
// delete(url, payload, <options>)
// external URL must be a full URL
// payload is usually NULL, but doesn't have to be
// external calls use cURL and require that options include auth headers and payload type
$api = $platform["api"];
$delete = $api->delete;
$url = 'http://localhost:8080/api/v2/db/_table/todo/' . $id2;
$result = $delete($url, null, $options);
var_dump($result);
if (array_key_exists("error", $result["content"])) {
    throw new \Exception("error code = " . $result["content"]["error"]["code"] . ", messsage = " . $result["content"]["error"]["message"]);
}
var_dump('external URL deleted 1 record');

return ['result' => 'ok'];

?>
