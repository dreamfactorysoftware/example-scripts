# ****************** Pre-processing script on a table ******************

#  A script that is triggered by a POST on /api/v2/db/_table/<tablename>. Runs before the db call is made.
#  The script validates that every record in the request has a value for the name field.

# use 'payload' for request
payload = event.request.payload

if(payload.resource):
    for record in payload.resource:
        if 'name' not in record:
            raise ValueError('Name field is required')
