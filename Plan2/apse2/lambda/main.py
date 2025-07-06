import json
import boto3
import os
import time

def handler(event, context):
    action = None
    body = {}

    # Check if the event has a body
    if event.get("body"):
        try:
            body = json.loads(event["body"])
            action = body.get("action")
        except Exception:
            action = None

        # handle different functions based on the action
        if action == "listup_all_objects":
            print("Action is to list up all objects in S3 bucket.")
            return listup_all_objects(event, context)
        
        elif action == "send_questionaire":
            print("Action is to send questionaire.")
            return send_questionaire(event, context)

    else:
        print("No body found in the event. Please check the request format.")
        print("Event:", event)    



# I cannot the following function in the javascript file in HTML file so trigger in the Lambda function
def listup_all_objects(event, context):
    s3 = boto3.client('s3')
    bucket_name = os.environ.get('WebS3BUCKET')
    
    if not bucket_name:
        raise ValueError("S3 bucket name is not set.")
    
    try:
        response = s3.list_objects_v2(Bucket=bucket_name)
        if 'Contents' in response:
            objects = [obj['Key'] for obj in response['Contents']]
        else:
            objects = []
        
        return {
            "statusCode": 200,
            "body": json.dumps(objects),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
    except Exception as e:
        print(f"Error listing objects in S3 bucket {bucket_name}: {e}")
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }   
    
def send_questionaire(event, context):
    # Extract data from the request body
    body = json.loads(event["body"])

    name = body.get("name")
    email = body.get("email")
    phone = body.get("phone")
    question = body.get("question")
    
    # Log the received data
    print(f"Received data: Name={name}, Email={email}, Phone={phone}, Question={question}")

    created_at = int(time.time())

    # Put data into DynamoDB table
    dynamodb = boto3.resource('dynamodb')
    table_name = "plan2-dynamodb-tbl"
    if not table_name:
        raise ValueError("DynamoDB table name is not set.")
    
    # Put data into DynamoDB table
    print(f"Inserting data into DynamoDB table: {table_name}")
    
    try:
        item = {
            "name": name,
            "MailAddress": email,
            "PhoneNumber": phone,
            "Question": question,
            "CreatedAt": created_at
        }
        dynamodb.Table(table_name).put_item(Item=item)

    except Exception as e:
        print(f"Error inserting data into DynamoDB table {table_name}: {e}")
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "Failed to insert data into DynamoDB"})
        }
    
    print(f"Data inserted into DynamoDB table {table_name}: {item}")

    # Publish message to SNS topic
    topic_arn = os.environ.get('SNS_TOPIC_ARN')
    sns = boto3.client('sns')
    sns_topic_arn = topic_arn
    
    if sns_topic_arn:
        try:
            sns.publish(
                TopicArn=sns_topic_arn,
                Message="API Lambda function is invoked via API Gateway successfully.",
                Subject="API Lambda function is invoked via API Gateway successfully."
            )
        except Exception as e:
            print(f"Error publishing message to SNS topic {sns_topic_arn}: {e}")
    else:
        print("No SNS topic ARN found in environment variables.")

    # If it doesn't include CORS headers, the browser in S3 bucket will block the response
    # but accessing URL directly will work.
    return {
    "statusCode": 200,
    "headers": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",  # Or your S3 website domain for more security
        "Access-Control-Allow-Methods": "GET,OPTIONS,POST"
    },
    "body": json.dumps({
        "message": "Data update completed into DynamoDB table. Please check the data below.",
        "data": {
            "name": name,
            "email": email,
            "phone": phone,
            "question": question,
            "created_at": str(created_at)
        }
    }),
    "isBase64Encoded": False
    }