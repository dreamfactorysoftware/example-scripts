# POST /api/v2/user/register triggers script user.register.post.pre_process
# This script runs BEFORE user is registered
 
payload = event.request.payload;
 
if(payload.resource):
  for record in payload.resource:
    if 'first_name' not in record:
      raise ValueError('First name field missing')
    if record.first_name == '':
      raise ValueError('First name field missing')
