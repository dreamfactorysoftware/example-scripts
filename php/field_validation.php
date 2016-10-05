// This script validates that certain fields are in the POST request when creating records.
// If not, an exception is thrown and 500 error returned to the client.
// If the script exits normally with no exception being thrown, then the records will be written to the database
// and the post-process script, if any, will be run.

// POST /api/v2/db/_table/account triggers script db._table.account.post.pre_process
// This script runs BEFORE records are written to the db.

$payload = $event['request']['payload'];

if(!empty($payload['resource'])){
    foreach($payload['resource'] as $record){
        if(!array_key_exists('annual_revenue', $record)){
            throw new \Exception('Missing field annual revenue.');
        }

        if($record['annual_revenue'] <= 0){
            throw new \Exception('Annual revenue must be > 0');
        }
    }
}
