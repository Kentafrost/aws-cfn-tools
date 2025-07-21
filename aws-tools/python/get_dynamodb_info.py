import boto3
import os
import logging

def get_dynamodb_info(table_name):
    client = boto3.client('dynamodb')
    try:
        # retrieve table information
        response = client.describe_table(TableName=table_name)
        logging.info(f"Table information for {table_name}: {response}")
        return response
    except Exception as e:
        logging.error(f"Error fetching table information for {table_name}: {e}")
        raise

def check_table_data(table_name):
    client = boto3.client('dynamodb')

    try:
        # list up all data in the table
        paginator = client.get_paginator('scan')
        page_iterator = paginator.paginate(TableName=table_name)
        items = []
        for page in page_iterator:
            items.extend(page.get('Items', []))
        logging.info(f"Data in table {table_name}: {items}")
        return items
    except Exception as e:
        logging.error(f"Error scanning table {table_name}: {e}")
        raise

if __name__ == "__main__":

    logging.basicConfig(level=logging.INFO)
    client = boto3.client('dynamodb')
    tables_info = client.list_tables()
    
    try:
        for table_name in tables_info['TableNames']:
            table_info = get_dynamodb_info(table_name)
            print(f"Table Name: {table_name}")
            print(table_info)

            checked_data = check_table_data(table_name)
            if checked_data:
                print(f"Data in {table_name}: {checked_data}")
            else:
                print(f"No data found in {table_name}.")
        print(f"Table Information: {table_info}")
    except Exception as e:
        print(f"Failed to retrieve table information: {e}")