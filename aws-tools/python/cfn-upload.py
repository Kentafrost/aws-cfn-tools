import time
import boto3
import os
import pandas as pd

# def upload_yaml_to_s3(bucket_name, s3_key, local_file_path):
#     s3_client = boto3.client('s3')
#     try:
#         s3_client.upload_file(local_file_path, bucket_name, s3_key)
#         print(f"File {local_file_path} uploaded to S3 bucket {bucket_name} with key {s3_key}.")

#     except Exception as e:
#         print(f"Error uploading file to S3: {e}")
#         raise
    
# upload into CloudFormation stack
def upload_to_cloudformation_stack(stack_name, local_file_path):
    cloudformation_client = boto3.client('cloudformation')
    
    check = input(f"Do you want to create CloudFormation stack {stack_name} with local file {local_file_path}? (y/n): ")
    if check.lower() != 'y':
        print("Stack creation aborted.")
        return {'status': 'aborted', 'stack_name': stack_name}
    
    try:    
        cloudformation_client.create_stack(
            StackName=stack_name,
            TemplateBody=open(local_file_path, 'r').read(),
            Capabilities=['CAPABILITY_IAM'],
            RoleARN='arn:aws:iam::204806963442:role/role_cloudformation_test'  # Replace with your IAM role ARN
        )
        print(f"CloudFormation stack {stack_name} created successfully.")
        print("Waiting for stack creation to complete...")
        cloudformation_client.get_waiter('stack_create_complete').wait(StackName=stack_name)
        print("Stack creation completed.")

        return f"{'status': 'success', 'stack_name': {stack_name}}"
    except Exception as e:
        print(f"Error creating CloudFormation stack: {e}")
        raise
    

if __name__ == "__main__":
    
    bucket_name = 'code-apse2-bucket1313'
    df = pd.read_csv('./yaml_deploy_list.csv')
    current_time = time.strftime("%Y-%m-%d_%H-%M")
    current_dir = os.path.dirname(os.path.abspath(__file__))
    service = 'cloudformation'

    log_file_path = os.path.join(f'{current_dir}\log\{service}', f'{current_time}.csv')
    if not os.path.exists(os.path.dirname(log_file_path)):
        os.makedirs(os.path.dirname(log_file_path))

    stack_status_list = []
    # get yaml files name from csv file
    for index, row in df.iterrows():
        
        local_folder_name = row["folder_name"]
        local_file_name = f"{row['file_name']}"
        local_file_path = f"./{local_folder_name}/{local_file_name}"
        
        # s3_key = f"yaml/{local_folder_name}/{local_file_name}"
        # upload_yaml_to_s3(bucket_name, s3_key, local_file_path)

        time.sleep(5)

        stack_name = local_file_path.replace('.yaml', '')
        stack_name = stack_name.replace('./', '')
        stack_name = stack_name.replace('/', '-')
        stack_name = stack_name.lower()
        print(f"Stack name: {stack_name}")
        
        # template_url = f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"

        if not os.path.exists(local_file_path):
            print(f"File {local_file_path} does not exist.")
            exit(1)
        
        status = upload_to_cloudformation_stack(stack_name, local_file_path)
        stack_status_list.append(status)
        time.sleep(5)
    
    print("All stacks processed.")
    print(stack_status_list)

    with open(log_file_path, 'w') as f:
        f.write("time_stamp, Stack Status Log\n")
        f.write("================, ==================\n")
        
        for status in stack_status_list:
            current_time = pd.Timestamp.now().strftime('%Y-%m-%d %H:%M')
            f.write(f"{current_time}, {status}\n")