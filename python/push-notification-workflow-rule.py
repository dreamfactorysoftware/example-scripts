# POST /api/v2/db/_table/todo triggers script db._table.todo.post.post_process
# This script runs AFTER records are written to the db.

# This script uses a pre-configured push notification service to send notifications when new records are created. 
 
payload = event.request.payload
 
if payload.resource != "":
    for record in payload.resource:
        msg = '{"Message":"A new Todo named '+record.name+' was just created!", "Subject":"New Todo Created"}'
 
        # service name is 'push', push to SNS topic by name
        result = platform.api.post('/push/topic/arn:aws:sns:us-east-1:xxxxxxx:new_todo', msg)
 
        # output result to storage/logs/dreamfactory.log
        print result.read()
