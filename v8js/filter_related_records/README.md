# Event Script For Filtering Related Data
## Related Files
* ./filterRelatedRecords.js

## Description
This event script is used to enabling filtering of related data in a GET call that pulls in records with related record

## Details
This script should be added as a post-process on a GET for a specific table in a sql database. Update the variables with the location and relationship name of the related data. Set the script as active and able to modify the response. Then call your API with your related filter parameter included. You should be able to filter the related (child) items in addition to the parent items. This is covered in detail on the [DreamFactory Blog](http://blog.dreamfactory.com/using-event-scripts-to-filter-related-data).
