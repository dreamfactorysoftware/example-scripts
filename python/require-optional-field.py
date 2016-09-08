# POST /api/v2/user/register triggers script user.register.post.pre_process
# This script runs BEFORE user is registered

payload = event.request.payload

if(payload):
    if 'first_name' not in payload:
        raise ValueError('First name field missing')
    if payload.first_name == '':
        raise ValueError("First name field required")
