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
