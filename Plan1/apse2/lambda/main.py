import boto3
import json
import os

def handler(event, context):
    s3 = boto3.client('s3')
    bucket_name = os.environ['S3_BUCKET']
    key = "AAA.txt"
    print(f"Checking for object in bucket: {bucket_name}")

    try:
        s3.get_object(Bucket=bucket_name, Key="AAA.txt")
        print(f"Object was found in bucket {bucket_name}")
    except s3.exceptions.NoSuchKey:
        print(f"Object not found in bucket {bucket_name}, creating it.")
        s3.put_object(Bucket=bucket_name, Key="AAA.txt", Body=json.dumps({"message": "Hello, World!"}))
        print(f"Object created in bucket {bucket_name} with key AAA.txt")
    except Exception as e:
        print(f"Error: {e}")

    try:
        response = s3.get_object(Bucket=bucket_name, Key=key)
        data = response['Body'].read().decode('utf-8')  # Read and decode the file content
        print(data)
    except Exception as e:
        print(f"Error reading file from S3: {e}")

    return {
    'statusCode': 200,
    'body': json.dumps('Lambda function executed successfully!')
    }