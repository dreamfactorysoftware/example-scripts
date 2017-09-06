var relationship_name = ''; // This is the relationship name that needs to be included in the call in order to execute the script. In the Blog example, this is contact_info_by_contact_id.
var related_filter_name = ''; // This is the name of the parameter used for filtering the related data. In the blog example this is contact_info_by_contact_id_filter.
var related_service_name = ''; // This is the name of the service that contains the related data. In the blog example this is db.
var related_table_name = ''; // This is the name of the table that contains the related data. In the blog example this is contact_info.
var related_id_field = ''; // This is the name of the id field of the table containing the related data. In the blog example this is id.
var related_endpoint = related_service_name + '/_table/' + related_table_name;
var options = {};
options.parameters = {};
var params = event.request.parameters;

if (params.hasOwnProperty('related')) {
    if (params.hasOwnProperty(related_filter_name)) {
        if (params.related.hasOwnProperty(relationship_name)) {
            options.parameters.fields = related_id_field;
            options.parameters.filter = params[related_filter_name];

            var related_result = platform.api.get(related_endpoint, null, options);

            var data = related_result.content;
            if (data.error) throw data.error.message;
            if (!data.resource) throw 'No records in response';
            var ids = data.resource.map(function(record) {return record[related_id_field];});
            event.response.content.resource.forEach(function(parent_record){
                parent_record[relationship_name] = parent_record[relationship_name].filter(function(obj){
                    return (ids.indexOf(obj.id) >= 0);
                });
            });
        }
    }
}
