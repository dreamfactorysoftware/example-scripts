# POST /api/v2/db/_table/account triggers script db._table.account.post.pre_process
# This script runs BEFORE records are written to the db.

payload = event.request.payload

if hasattr(payload, 'resource') and payload.resource:
    for record in payload.resource:
        # Validate required fields
        if 'name' not in record:
            raise ValueError('Missing field: name')
        if 'email' not in record:
            raise ValueError('Missing field: email')
        
        # Validate field values
        if not record.name or record.name.strip() == '':
            raise ValueError('Name field cannot be empty')
        if not record.email or record.email.strip() == '':
            raise ValueError('Email field cannot be empty')
        
        # Optional: Validate email format
        if '@' not in record.email:
            raise ValueError('Invalid email format')
else:
    raise ValueError('No resource data found in payload')
