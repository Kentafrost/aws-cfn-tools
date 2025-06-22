import boto3
import os

def handler(event, context):
    
    s3 = boto3.client('s3')
    bucket_name = os.environ.get('WebS3BUCKET')
    response = s3.list_objects_v2(Bucket=bucket_name)

    for obj in response.get('Contents', []):
        print(obj['Key'])
        
    topic_arn = os.environ.get('SNS_TOPIC_ARN')
    sns = boto3.client('sns')
    sns_topic_arn = topic_arn
    
    if sns_topic_arn:
        sns.publish(
            TopicArn=sns_topic_arn,
            Message="API Lambda function is invoked via API Gateway successfully.",
            Subject="Results of ECR images Lambda function"
        )
    else:
        print("No SNS topic ARN found in environment variables.")

    return {
    "statusCode": 200,
    "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS"
    },
    "body": "{\"message\": \"Hello from Lambda!\"}"
    }