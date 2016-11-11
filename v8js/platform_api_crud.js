var url, data, result, options;
var payload = {'resource':[{'name':'test','complete':false}]};

options = {
    'headers': {
        'X-DreamFactory-Api-Key': platform.session.api_key,
        'X-DreamFactory-Session-Token': platform.session.session_token,
        'Content-Type': 'application/json'
    }
};

// create a record using internal URL, do not stringify payload
url = 'db/_table/todo';
result = platform.api.post(url, payload);
data = result.content;
if (data.error) throw data.error.message;
if (!data.resource || data.resource.length !== 1) throw 'bad data.resource in response';
var_dump('internal URL created ' + data.resource.length +  ' records');

var id1 = data.resource[0].id;

// create a record using external URL, stringify payload and add headers
url = 'http://localhost:8080/api/v2/db/_table/todo';
result = platform.api.post(url, JSON.stringify(payload), options);
data = result.content;
if (data.error) throw data.error.message;
if (!data.resource || data.resource.length !== 1) throw 'bad data.resource in response';
var_dump('external URL created ' + data.resource.length + ' records');

var id2 = data.resource[0].id;

// get records using internal URL
url = 'db/_table/todo';
result = platform.api.get(url);
data = result.content;
if (data.error) throw data.error.message;
if (!data.resource) throw 'no data.resource in response';
var_dump('internal URL found ' + data.resource.length + ' records');

// get records using external URL, add headers
url = 'http://localhost:8080/api/v2/db/_table/todo';
// payload is null, but required to add options as third arg
result = platform.api.get(url, null, options);
data = result.content;
if (data.error) throw data.error.message;
if (!data.resource) throw 'no data.resource in response';
var_dump('external URL found ' + data.resource.length + ' records');

// update a record using internal URL, do not stringify payload
url = 'db/_table/todo/' + id1;
result = platform.api.patch(url, payload);
data = result.content;
if (data.error) throw data.error.message;
var_dump('internal URL updated 1 record');

// update a record using external URL, stringify payload and add headers
url = 'http://localhost:8080/api/v2/db/_table/todo/' + id2;
result = platform.api.patch(url, JSON.stringify(payload), options);
data = result.content;
if (data.error) throw data.error.message;
var_dump('external URL updated 1 record');

// delete record using internal URL
url = 'db/_table/todo/' + id1;
result = platform.api.delete(url);
var_dump(result);
data = result.content;
if (data.error) throw data.error.message;
var_dump('internal URL deleted 1 record');

// delete a record using external URL, add headers
url = 'http://localhost:8080/api/v2/db/_table/todo/' + id2;
result = platform.api.delete(url, null, options);
data = result.content;
if (data.error) throw data.error.message;
var_dump('external URL deleted 1 record');

return {'result': 'ok'};
