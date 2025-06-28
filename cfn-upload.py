from time import sleep
import boto3
import os

def upload_yaml_to_s3(bucket_name, s3_key, local_file_path):
    s3_client = boto3.client('s3')
    try:
        s3_client.upload_file(local_file_path, bucket_name, s3_key)
        print(f"File {local_file_path} uploaded to S3 bucket {bucket_name} with key {s3_key}.")
    except Exception as e:
        print(f"Error uploading file to S3: {e}")
        raise
    
# upload into CloudFormation stack
def upload_to_cloudformation_stack(stack_name, template_url):
    cloudformation_client = boto3.client('cloudformation')
    try:
        response = cloudformation_client.create_stack(
            StackName=stack_name,
            TemplateURL=template_url,
            Capabilities=['CAPABILITY_IAM']
        )
        print(f"CloudFormation stack {stack_name} created successfully.")
        return response
    except Exception as e:
        print(f"Error creating CloudFormation stack: {e}")
        raise
    

if __name__ == "__main__":
    bucket_name = 'code-apse2-bucket1313'
    s3_key = 'yaml/AAA.yaml'
    
    local_file_path = './Plan7/AAA.yaml'
    # upload_yaml_to_s3(bucket_name, s3_key, local_file_path)
    sleep(5)
    
    stack_name = local_file_path.replace('.yaml', '')
    stack_name = stack_name.replace('./', '')
    stack_name = stack_name.replace('/', '-')
    stack_name = stack_name.lower()
    print(f"Stack name: {stack_name}")
    
    template_url = f"https://{bucket_name}.s3.amazonaws.com/{s3_key}"

    if not os.path.exists(local_file_path):
        print(f"File {local_file_path} does not exist.")
        exit(1)
        
    # Upload the YAML file to S3
    upload_yaml_to_s3(stack_name, template_url)
    print("File upload completed successfully.")