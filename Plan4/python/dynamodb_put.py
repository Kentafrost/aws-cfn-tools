import boto3
import os
import pandas as pd

def put_item_to_dynamodb(table_name, item):
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)

    try:
        response = table.put_item(Item=item)
        print(f"Item successfully put into {table_name}: {item}")
        return response
    except Exception as e:
        print(f"Error putting item into {table_name}: {e}")
        raise
    
if __name__ == "__main__":
    
    s3_bucket_name = 'ec2-websites-apse2-bucket1313'
    s3_file_key = 'csv/dynamodb_data.csv'

    try:
        s3_client = boto3.client('s3')
        s3_client.download_file(s3_bucket_name, s3_file_key, './dynamodb_data.csv')
    except Exception as e:
        print(f"Error downloading file from S3: {e}")
        exit(1)

    table_name = 'plan2-dynamodb-tbl'

    df = pd.read_csv('./dynamodb_data.csv')

    for index, row in df.iterrows():
        
        try:
            item = {
                'id': str(row['id']),
                'name': row['name'],
                'description': row['description']
            }
            print(f"Putting item into DynamoDB: {item}")
            put_item_to_dynamodb(table_name, item)
        except Exception as e:
            print(f"Error putting item into DynamoDB: {e}")

    print("All items have been processed.")