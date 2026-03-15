<?php
// create html files with data from a csv file

function create_html($title, $content, $url, $description) {
    $html = "<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>$title</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            background-color: #f5f5f5; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        h1 { color: #333; }
        p { line-height: 1.6; }
        .url { color: #0066cc; text-decoration: underline; }
        .description { font-style: italic; margin-top: 20px; }
    
    </style>
</head>
<body>
    <h1>$title</h1>
    <p>$content</p>
    <p class='url'>URL: <a href='$url' target='_blank'>$url</a></p>
    <p class='description'>$description</p>
</body>
</html>";
    return $html;
}

// read csv file and return all data
function read_csv($file_path) {
    $all_data = [];
    
    if (!file_exists($file_path)) {
        echo "Error: CSV file not found at $file_path\n";
        return false;
    }
    
    $file = fopen($file_path, 'r');
    if ($file !== false) {
        $header = fgetcsv($file); // Read header row
        echo "CSV Headers: " . implode(", ", $header) . "\n";
        
        while (($data = fgetcsv($file)) !== false) {
            $all_data[] = $data;
            echo "Read row: " . implode(", ", $data) . "\n";
        }
        fclose($file);
    } else {
        echo "Error: Could not open CSV file\n";
        return false;
    }
    
    return $all_data;
}

// Save HTML content to file
function save_html_file($current_file_path, $filename, $html_content) {
    $file_path = dirname($current_file_path) . "\\html\\$filename.html";

    if (file_put_contents($file_path, $html_content)) {
        echo "HTML file created successfully: $file_path\n";
        return true;
    } else {
        echo "Error: Could not create HTML file: $file_path\n";
        return false;
    }
}

$s3_bucket_name = getenv('WebS3BUCKET');

// csv file get from S3 PUT event
if (!$s3_bucket_name) {
    echo "Error: Environment variable 'WebS3BUCKET' not set.\n";
    exit(1);
}
$s3_csv_file = "html_input_data.csv";
$s3_csv_path = "s3://$s3_bucket_name/$s3_csv_file";



// Main execution
// get current file path

$current_file_path = __FILE__;
echo "Current working directory: $current_file_path\n";

// Check if CSV file exists
$csv_file = dirname($current_file_path) . "\html_input_data.csv";
echo "Looking for CSV file: $csv_file\n";

$csv_data = read_csv($csv_file);

if ($csv_data !== false && count($csv_data) > 0) {
    echo "Processing " . count($csv_data) . " rows from CSV\n";
    
    // Process each row and create HTML files
    foreach ($csv_data as $index => $row) {
        if (count($row) >= 4) {
            $title = $row[0];
            $content = $row[1];
            $url = $row[2];
            $description = $row[3];
            
            // Create HTML content
            $html_content = create_html($title, $content, $url, $description);
            
            // Create filename from title (sanitize for filesystem)
            $filename = preg_replace('/[^a-zA-Z0-9_-]/', '_', $title);
            $filename = "page_" . ($index + 1) . "_" . $filename;
            
            // Save HTML file
            save_html_file($current_file_path, $filename, $html_content);
        } else {
            echo "Warning: Row " . ($index + 1) . " doesn't have enough columns\n";
        }
    }
    
    echo "HTML file generation completed!\n";
} else {
    echo "No data found in CSV file or file could not be read\n";
}
?>