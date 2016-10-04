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
