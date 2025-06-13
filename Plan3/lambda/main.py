# send e-mail notification by CloudWatch Event
import json
import boto3
import os

sns = boto3.client('sns')

SNS_TOPIC_ARN = os.environ.get('SNS_TOPIC_ARN')  # Set this as a Lambda environment variable

def lambda_handler(event, context):
    # Extract details from the CloudWatch event
    subject = "CloudWatch Event Notification"
    message = json.dumps(event, indent=2)
    
    # Example: subject = event.get('detail-type', subject)
    response = sns.publish(
        TopicArn=SNS_TOPIC_ARN,
        Subject=subject,
        Message=message
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps('Notification sent', default=str)
    }