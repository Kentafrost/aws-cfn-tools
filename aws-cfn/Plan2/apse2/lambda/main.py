import boto3
import os

def handler(event, context):
    
    s3 = boto3.client('s3')
    bucket_name = os.environ.get('WebS3BUCKET')

    response = s3.list_objects_v2(Bucket=bucket_name)

    for obj in response.get('Contents', []):
        print(obj['Key'])
    print("API Lambda function is invoked via API Gateway successfully.")
    topic_arn = os.environ.get('SNS_TOPIC_ARN')
    # Send E-mail from SNS topic
    sns = boto3.client('sns')
    sns_topic_arn = topic_arn
    
    if sns_topic_arn:
        sns.publish(
            TopicArn=sns_topic_arn,
            Message="API Lambda function is invoked via API Gateway successfully.",
            Subject="API Lambda function is invoked via API Gateway successfully."
        )
    else:
        print("No SNS topic ARN found in environment variables.")

    # If it doesn't include CORS headers, the browser in S3 bucket will block the response
    # but accessing URL directly will work.
    return {
    "statusCode": 200,
    "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",  # Or your S3 website domain for more security
        "Access-Control-Allow-Methods": "GET,OPTIONS"
    },
    "body": "{\"message\": \"Hello from Lambda!\"}"
    }