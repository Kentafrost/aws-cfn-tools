# triggered by S3 put event, modify the data, save it to the csv, then save into S3 bucket
import pandas as pd
import boto3
import os
import json

def handler(event, context):

    dynamodb = boto3.resource('dynamodb', region_name='ap-southeast-2')
    
    # Specify the table name
    table_name = 'plan2-dynamodb-tbl'
    table = dynamodb.Table(table_name)
    # get the data from DynamoDB table
    response = table.scan()
    items = response.get('Items', [])
    if not items:
        print("No items found in the DynamoDB table.")
        return
    # Convert the items to a DataFrame
    df = pd.DataFrame(items)

    csv = pd.read_csv('hina.csv')
    
    # Initialize a session using Amazon DynamoDB

    for index, row in df.iterrows():
        # Prepare the item to be put into DynamoDB
        name = row['name']
        email = row['email']
        phone = row['phone']
        question = row['question']
        created_at = row['created_at']
        
        name = name.upper()
        if "gmail.com" in email:
            mail_com = "g-mail"
        elif "yahoo.com" in email:
            mail_com = "yahoo"
        elif "hotmail.com" in email:
            mail_com = "hotmail"
        elif "outlook.com" in email:
            mail_com = "outlook"
        else:
            mail_com = "other"
            
        if "+1" in phone:
            country_code = "US"
        elif "+44" in phone:
            country_code = "UK"
        elif "+91" in phone:
            country_code = "IN"
        elif "+81" in phone:
            country_code = "JP"
        
        
    # put all the data into csv file
    csv = pd.DataFrame({
        'name': [name],
        'email': [email],
        'phone': [phone],
        'question': [question],
        'created_at': [created_at],
        'mail_com': [mail_com],
        'country_code': [country_code]
    })
    
    csv.to_csv('modified_data.csv', index=False)

    current_day = pd.to_datetime('today').strftime('%Y-%m-%d')

    s3_client = boto3.client('s3')
    s3_client.upload_file('modified_data.csv', 'web-apse2-bucket1313', f'data/output/modified_data_{current_day}.csv')

    print("UpdateItem succeeded:")
    print(response)
    
    # send sns message
    sns_publish(name, email, phone, question, created_at)


def sns_publish(name, email, phone, question, created_at):
    
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