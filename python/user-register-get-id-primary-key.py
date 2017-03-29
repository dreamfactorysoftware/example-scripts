# POST /api/v2/user/register triggers script user.register.post.post_process
# This script runs AFTER user is registered
# The purpose of this script is to get the dreamfactory user id of the user that was just registered
# and then use that as a primary key for a custom "user data" table

import bunch

# set up headers
options = {}
options['headers'] = {}
options['headers']['X-DreamFactory-Api-Key'] = platform.session.api_key
options['headers']['X-DreamFactory-Session-Token'] = platform.session.session_token

# get records using internal URL; call api.get on the user session that was just 
# created (this script will only work in post process!)
url = 'user/session'
result = platform.api.get(url)
data = result.read()
jsonData = bunchify(json.loads(data))
if 'error' in jsonData:
	raise ValueError(jsonData.error.message)
	
# save the data from api.get on user/session to local variables
User_OID = str(jsonData.id)
UserName = jsonData.first_name
Email = jsonData.email

# create a simple json object that will be inserted into the custom user data table
post_data = '{"resource": [{"User_OID": ' + User_OID + ',"UserName": "' + UserName + '","Email": "' + Email + '"}]}'

# create a record using internal URL; call api.post with the post data that was built above, data will
#  be posted to custom UserData table
url = 'db_mysql/_table/UserData?fields=*'
result = platform.api.post(url, post_data)
data = result.read()
jsonData = bunchify(json.loads(data))
if 'error' in jsonData:
	raise ValueError(jsonData.error.message)
elif 'resource' not in jsonData or len(jsonData.resource) != 1:
	raise ValueError('Unexpected response from url = ' + url)