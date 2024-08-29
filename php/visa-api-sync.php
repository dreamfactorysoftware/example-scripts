<?php
// API Endpoint and Credentials
$visa_api_url = "https://sandbox.api.visa.com/v2/binRangeDetails";
$visa_username = "xxxxx";  
$visa_password = "xxxxx";  

// Proxy settings (optional)
$proxy_url = "https://proxy.local";  
$proxy_port = 8000; 

// Cert settings (optional)
$certFile = "/Certificates/VISA/cert.pem";
$keyFile = "/Certificates/VISA/key.pem";
$cacertFile = "/Certificates/cacert.pem";
$file = fopen("/Certificates/VISA/output.csv", "w");

// DreamFactory API object
$api = $platform['api'];

// Debugging log to ensure the script is running
echo("Script started");

// Function to Call Visa API with Proxy Support
function callVisaAPI($url, $username, $password, $request_body, $proxy_url, $proxy_port, $certFile, $keyFile, $cacertFile, $retry_count = 3) {
    echo("Starting Visa API call");
    
    while ($retry_count > 0) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($request_body));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

        // Set proxy details
        curl_setopt($ch, CURLOPT_PROXY, $proxy_url);
        curl_setopt($ch, CURLOPT_PROXYPORT, $proxy_port);
        
        // Set cert and key
        curl_setopt($ch, CURLOPT_SSLCERT, $certFile);
        curl_setopt($ch, CURLOPT_SSLKEY, $keyFile);
        curl_setopt($ch, CURLOPT_CAINFO,  $cacertFile);

        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        if (curl_errno($ch) || $http_code !== 200) {
            $retry_count--;
            echo("Visa API call failed with error: " . curl_error($ch) . " and HTTP code: " . $http_code);
            if ($retry_count === 0) {
                echo("Visa API call failed after retries: " . curl_error($ch));
                return false;
            }
            sleep(1); // Wait 1 second before retrying
        } else {
            echo("Visa API call successful with HTTP code: " . $http_code);
            curl_close($ch);
            return json_decode($response, true);
        }
    }
    
    echo("Exiting Visa API call function");
}

// Function to POST data to SQL Server using DreamFactory API
function postToSQLServer($api, $records) {
    $url = "sql_db/_table/your_table_name"; // Replace with your SQL table endpoint
    $data = ["resource" => $records];

    try {
        $result = $api->post($url, $data, []);
        echo("Data successfully posted to SQL Server. " . print_r($result, true));
        return true;
    } catch (Exception $e) {
        echo("Failed to post data to SQL Server: " . $e->getMessage());
        return false;
    }
}

// Function to process Visa API response and determine if more data is available
function processVisaResponse($response, $api) {
    if (isset($response['responseData'])) {
        echo("Processing " . count($response['responseData']) . " records.");

        // Prepare data for SQL Server
        $sql_records = [];
        foreach($response['responseData'] as $record) {
            echo $record['binRangeMinNum'] . $record['binRangeMaxNum']  .  $record['binRangePaymentAccountType'];
            
            // Create a record for SQL Server
            $sql_record = [
                "binRangeMinNum" => $record['binRangeMinNum'],
                "binRangeMaxNum" => $record['binRangeMaxNum'],
                "binRangePaymentAccountType" => $record['binRangePaymentAccountType'],
                // Add more fields here based on your SQL table structure
            ];
            $sql_records[] = $sql_record;
        }

        // Post data to SQL Server
        postToSQLServer($api, $sql_records);
    }

    // Check if there are more records to fetch
    return isset($response['areNextOffsetRecordsAvailable']) && $response['areNextOffsetRecordsAvailable'] === 'Y';
}

// Initialize parameters
$binRangeSearchIndex = 0;
$more_records = true;

while ($more_records) {
    // Prepare the request body with the current search index
    $request_body = [
        "requestHeader" => [
            "requestTS" => date("Y-m-d"),
            "requestMessageID" => "vbass_sandbox"
        ],
        "requestData" => [
            "binRangeSearchIndex" => $binRangeSearchIndex,
            "paymentAccountType" => "P",
            "binRangeCount" => "500"
        ]
    ];

    // Call the Visa API
    $visa_response = callVisaAPI($visa_api_url, $visa_username, $visa_password, $request_body, $proxy_url, $proxy_port, $certFile, $keyFile, $cacertFile);
    
    if ($visa_response === false) {
        echo("Visa API call did not return a response.");
        break;
    }

    // Process the response and check if more records are available
    $more_records = processVisaResponse($visa_response, $api);

    if ($more_records) {
        // Update the search index to fetch the next batch of records
        $binRangeSearchIndex += 500;
        echo("Fetching next set of records starting at index " . $binRangeSearchIndex);
    }
}

echo("All records fetched.");
fclose($file);
?>
