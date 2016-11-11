var async = require('async');

var url, result, options;
var payload = {'resource':[{'name':'test','complete':false}]};

options = {
    'headers': {
        'X-DreamFactory-Api-Key': platform.session.api_key,
        'X-DreamFactory-Session-Token': platform.session.session_token,
        'Content-Type': 'application/json'
    }
};

var id1, id2;

function createInternal(callback) {

    // create a record using internal URL
    url = 'db/_table/todo';
    platform.api.post(url, payload, null, function(body, response) {
        result = JSON.parse(body);
        if (!result) {
            callback('Unexpected response from url = ' + url);
        } else if (result.error) {
            callback(result.error.message);
        } else if (!result.resource || result.resource.length !== 1) {
            callback('Unexpected response from url = ' + url);
        } else {
            id1 = result.resource[0].id;
            console.log('internal URL created ' + result.resource.length +  ' records');
            callback();
        }
    });
}

function createExternal(callback) {

    // create a record using external URL
    url = 'http://localhost:8080/api/v2/db/_table/todo';
    platform.api.post(url, payload, options, function(body, response) {
        result = JSON.parse(body);
        if (!result) {
            callback('Unexpected response from url = ' + url);
        } else if (result.error) {
            callback(result.error.message);
        } else if (!result.resource || result.resource.length !== 1) {
            callback('Unexpected response from url = ' + url);
        } else {
            id2 = result.resource[0].id;
            console.log('external URL created ' + result.resource.length +  ' records');
            callback();
        }
    });
}

function getInternal(callback) {

    // get records using internal URL
    url = 'db/_table/todo';
    platform.api.get(url, null, function(body, response) {
        result = JSON.parse(body);
        if (!result) {
            callback('Unexpected response from url = ' + url);
        } else if (result.error) {
            callback(result.error.message);
        } else if (!result.resource) {
            callback('Unexpected response from url = ' + url);
        } else {
            console.log('internal URL found ' + result.resource.length +  ' records');
            callback();
        }
    });
}

function getExternal(callback) {

    // get records using external URL
    url = 'http://localhost:8080/api/v2/db/_table/todo';
    platform.api.get(url, options, function(body, response) {
        result = JSON.parse(body);
        if (!result) {
            callback('Unexpected response from url = ' + url);
        } else if (result.error) {
            callback(result.error.message);
        } else if (!result.resource) {
            callback('Unexpected response from url = ' + url);
        } else {
            console.log('external URL found ' + result.resource.length +  ' records');
            callback();
        }
    });
}

function updateInternal(callback) {

    // update a record using internal URL
    url = 'db/_table/todo/' + id1;
    platform.api.patch(url, payload, null, function(body, response) {
        result = JSON.parse(body);
        if (!result) {
            callback('Unexpected response from url = ' + url);
        } else if (result.error) {
            callback(result.error.message);
        } else {
            console.log('internal URL updated 1 record');
            callback();
        }
    });
}

function updateExternal(callback) {

    // update a record using external URL
    url = 'http://localhost:8080/api/v2/db/_table/todo/' + id2;
    platform.api.patch(url, payload, options, function(body, response) {
        result = JSON.parse(body);
        if (!result) {
            callback('Unexpected response from url = ' + url);
        } else if (result.error) {
            callback(result.error.message);
        } else {
            console.log('external URL updated 1 record');
            callback();
        }
    });
}

function deleteInternal(callback) {

    // delete a record using internal URL
    url = 'db/_table/todo/' + id1;
    platform.api.delete(url, null, null, function(body, response) {
        result = JSON.parse(body);
        if (!result) {
            callback('Unexpected response from url = ' + url);
        } else if (result.error) {
            callback(result.error.message);
        } else {
            console.log('internal URL deleted 1 record');
            callback();
        }
    });
}

function deleteExternal(callback) {

    // delete a record using external URL
    url = 'http://localhost:8080/api/v2/db/_table/todo/' + id2;
    platform.api.delete(url, null, options, function(body, response) {
        result = JSON.parse(body);
        if (!result) {
            callback('Unexpected response from url = ' + url);
        } else if (result.error) {
            callback(result.error.message);
        } else {
            console.log('external URL deleted 1 record');
            callback();
        }
    });
}

async.series([
    function (callback) {
        createInternal(callback)
    },
    function (callback) {
        createExternal(callback)
    },
    function (callback) {
        getInternal(callback)
    },
    function (callback) {
        getExternal(callback)
    },
    function (callback) {
        updateInternal(callback)
    },
    function (callback) {
        updateExternal(callback)
    },
    function (callback) {
        deleteInternal(callback)
    },
    function (callback) {
        deleteExternal(callback)
    }
],
function(err) {
    if (err) {
        throw new Error(err);
    } else {
        event.setResponse({'result': 'ok'}, 200, 'application/json');
    }
});
