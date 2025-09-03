# ****************** Post-processing script on a table ******************

#  A script that is triggered by a GET on /api/v2/db/_table/<tablename>. Runs after the db call is made.
#  The script adds a new field to each record in the response.
#  To allow modification of response content, select checkbox in scripting tab of admin console.

# use 'content' for response
content = event.response.content

# For this change to take effect you have to enable modification of response in admin console script editor.
# Checkbox label is 'Allow script to modify request (pre-process) or response (post-process)'.

if(content.resource):
    for record in content.resource:
        record.extraField = 'Feed the dog'
