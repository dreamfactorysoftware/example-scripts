// Log each user logout event to Logstash.
// This script can be triggered by each user logout API call.

// In the scripts tab, add this script to user -> user.session -> delete -> user.session.delete.pre_process.
// Make sure you've correctly configured Logstash as a service in the Services tab of the DreamFactory Admin Console.

// To enable Node.js scripting, set the path to node in your DreamFactory .env file.
// This setting is commented out by default.
//
// DF_NODEJS_PATH=/usr/local/bin/node
//
// Use npm to install any dependencies. This script requires 'lodash.'
// Your scripts can call console.log to dump info to the log file in storage/logs.

// In the scripts tab, add this script to user -> user.session -> delete -> user.session.delete.pre_process.
// Make sure you've correctly configured Logstash as a service in the Services tab of the DreamFactory Admin Console.

var email = '';
if(platform.session.user && platform.session.user.email){
	email = platform.session.user.email;
}
var log = {
    "level":"alert",
    "message":"Logging out [" + email + "]"
};
platform.api.post('logstash', log);
