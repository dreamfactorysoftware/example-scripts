This script allows you to obfuscate sql database table endpoints. For example, you might want to change 'absurdlylongdbname/_table/mycustinfo2015' to just 'customers'.

There are two versions. One that works with DreamFactory 2.3.1 and earlier, and one that works with DreamFactory 2.4.0 and later.

To use this script, add your sql database to dreamfactory (if not done already.)

Then create a new script service of type v8js. Name it something short and sweet (like customers in the example above.)

Paste the script into the script editor and change api_path variable to be whatever service/_table/tablename you want to obfuscate.
Save the service. It is now available using the standard DreamFactory table record API procedures, except the endpoint is shortened.
See http://wiki.dreamfactory.com/DreamFactory/Features/Database#Table_Records_.28_table.29 for details on Table Record operations.

Also available for v8js. `../../v8js/table_endpoint_obfuscation`
