payload = '{\"resource\":[{\"name\":\"test\",\"complete\":false}]}'

options = {}
options['headers'] = {}
options['headers']['X-DreamFactory-Api-Key'] = platform.session.api_key
options['headers']['X-DreamFactory-Session-Token'] = platform.session.session_token

# create a record using internal URL
url = 'db/_table/todo'
result = platform.api.post(url, payload)
data = result.read()
jsonData = bunchify(json.loads(data))
if 'error' in jsonData:
    raise ValueError(jsonData.error.message)
elif 'resource' not in jsonData or len(jsonData.resource) != 1:
    raise ValueError('Unexpected response from url = ' + url)
print 'internal URL created ' + str(len(jsonData.resource)) + ' records'

id1 = jsonData.resource[0].id

# create a record using external URL
url = 'http://localhost:8080/api/v2/db/_table/todo'
result = platform.api.post(url, payload, options)
data = result.read()
jsonData = bunchify(json.loads(data))
if 'error' in jsonData:
    raise ValueError(jsonData.error.message)
elif 'resource' not in jsonData or len(jsonData.resource) != 1:
    raise ValueError('Unexpected response from url = ' + url)
print 'external URL created ' + str(len(jsonData.resource)) + ' records'

id2 = jsonData.resource[0].id

# get records using internal URL
url = 'db/_table/todo'
result = platform.api.get(url)
data = result.read()
jsonData = bunchify(json.loads(data))
if 'error' in jsonData:
    raise ValueError(jsonData.error.message)
elif 'resource' not in jsonData:
    raise ValueError('Unexpected response from url = ' + url)
print 'internal URL found ' + str(len(jsonData.resource)) + ' records'

# get records using external URL
url = 'http://localhost:8080/api/v2/db/_table/todo'
result = platform.api.get(url, options)
data = result.read()
jsonData = bunchify(json.loads(data))
if 'error' in jsonData:
    raise ValueError(jsonData.error.message)
elif 'resource' not in jsonData:
    raise ValueError('Unexpected response from url = ' + url)
print 'external URL found ' + str(len(jsonData.resource)) + ' records'

# update a record using internal URL
url = 'db/_table/todo/' + str(id1)
result = platform.api.patch(url, payload)
data = result.read()
jsonData = bunchify(json.loads(data))
if 'error' in jsonData:
    raise ValueError(jsonData.error.message)
print 'internal URL updated 1 record'

# update a record using external URL
url = 'http://localhost:8080/api/v2/db/_table/todo/' + str(id2)
result = platform.api.patch(url, payload, options)
data = result.read()
jsonData = bunchify(json.loads(data))
if 'error' in jsonData:
    raise ValueError(jsonData.error.message)
print 'external URL updated 1 record'

# delete a record using internal URL
url = 'db/_table/todo/' + str(id1)
result = platform.api.delete(url)
data = result.read()
jsonData = bunchify(json.loads(data))
if 'error' in jsonData:
    raise ValueError(jsonData.error.message)
print 'internal URL deleted 1 record'

# delete a record using external URL
url = 'http://localhost:8080/api/v2/db/_table/todo/' + str(id2)
result = platform.api.delete(url, None, options)
data = result.read()
jsonData = bunchify(json.loads(data))
if 'error' in jsonData:
    raise ValueError(jsonData.error.message)
print 'external URL deleted 1 record'

return {'result': 'ok'}
