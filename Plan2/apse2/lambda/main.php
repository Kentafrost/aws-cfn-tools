<?php
// Lambda function to handle incoming requests and store data in DynamoDB
require 'vendor/autoload.php';

use Aws\DynamoDb\DynamoDbClient;

function handler($event, $context) {
    $body = json_decode($event['body'], true);

    $name = $body['name'] ?? '';
    $email = $body['email'] ?? '';
    $phone = $body['phone'] ?? '';
    $question = $body['question'] ?? '';

    $dynamodb = new DynamoDbClient([
        'region' => 'ap-southeast-2',
        'version' => 'latest'
    ]);

    $result = $dynamodb->putItem([
        'TableName' => 'plan2-dynamodb-tbl',
        'Item' => [
            'name'  => ['S' => $name],
            'email' => ['S' => $email],
            'phone' => ['S' => $phone],
            'question' => ['S' => $question],
        ]
    ]);

    return [
        'statusCode' => 200,
        'body' => json_encode(['message' => 'Data saved!', 'result' => $result])
    ];
}