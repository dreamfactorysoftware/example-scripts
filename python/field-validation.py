# POST /api/v2/db/_table/account triggers script db._table.account.post.pre_process
# This script runs BEFORE records are written to the db.
 
payload = event.request.payload;
 
if(payload.resource):
    for record in payload.resource:
        if 'annual_revenue' not in record:
            raise ValueError('Missing field annual revenue');
        if record.annual_revenue <= 0:
            raise ValueError('Annual Revenue must be > 0');
