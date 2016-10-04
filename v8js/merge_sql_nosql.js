// This script runs after a GET on the service db at db/_table/contact.
// For each record in the response, it queries MongoDB to get another field, the Twitter handle for the contact.
// It adds that to the response as a field named 'from_mongo_twitter'.
// For this change to take effect, you have to enable modification of response in the Admin Console script editor.
// Check the box 'Allow script to modify request (pre-process) or response (post-process)'.

var lodash = require("lodash.min.js");

if (event.response.content.resource) {

	lodash._.each (event.response.content.resource, function( record ) {

		// filter by email
		var params = {

			"filter": "email=" + record.email
		}

		// get matching record from MongoDB service
		var result = platform.api.get("mongodb/_table/contact", params);

		// from_mongo_twitter can be a field in MySQL schema, but it doesn't have to be
		record.from_mongo_twitter = result.content.resource[0].twitter;
	});
}
