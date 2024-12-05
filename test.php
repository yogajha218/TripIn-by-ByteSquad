<?php
// Check PHP version and SSL/cURL capabilities
echo "PHP Version: " . phpversion() . "\n";
echo "cURL Version: " . (extension_loaded('curl') ? curl_version()['version'] : 'Not Loaded') . "\n";

// Check certificate file path
echo "CA Cert Path (curl.cainfo): " . ini_get('curl.cainfo') . "\n";
echo "CA Cert Path (openssl.cafile): " . ini_get('openssl.cafile') . "\n";

// Verify file exists
$certPath = ini_get('curl.cainfo');
echo "Certificate File Exists: " . (file_exists($certPath) ? 'Yes' : 'No') . "\n";

// Test SSL connection with detailed error reporting
$ch = curl_init('https://www.example.com');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_CAINFO, $certPath);
curl_setopt($ch, CURLOPT_VERBOSE, true);

// Capture output
$output = fopen('php://temp', 'w+');
curl_setopt($ch, CURLOPT_STDERR, $output);

$result = curl_exec($ch);

if ($result === false) {
    echo "cURL Error: " . curl_error($ch) . "\n";

    // Rewind and read the verbose output
    rewind($output);
    $verbose = stream_get_contents($output);
    echo "Verbose Output:\n" . $verbose . "\n";
}

curl_close($ch);
fclose($output);
?>
