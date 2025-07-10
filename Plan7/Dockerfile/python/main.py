import boto3
import os

# check all the objects in the S3 bucket and publish a message to SNS topic
def handler(event, context):
    
    s3 = boto3.client('s3')
    bucket_name = os.environ.get('WebS3BUCKET')
    response = s3.list_objects_v2(Bucket=bucket_name)

    objects = []
    for obj in response.get('Contents', []):
        print(obj['Key'])
        objects.append(obj['Key'])
    print(f"Objects in bucket {bucket_name}: {objects}")

        
    topic_arn = os.environ.get('SNS_TOPIC_ARN')
    sns = boto3.client('sns')
    sns_topic_arn = topic_arn
    
    if sns_topic_arn:
        sns.publish(
            TopicArn=sns_topic_arn,
            Message={"Objects in S3 bucket have been listed successfully. "
            "The following objects were found: " + ", ".join(objects) +
            "\nAlso, if you see this message, the Lambda function executed successfully. " +
            "This is published from the Lambda function with the name: " + context.function_name}
            ,
            Subject="Results of checking S3 bucket objects"
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
    "body": "{\"message\": \"Lambda function is successfully invoked\"}"
    }