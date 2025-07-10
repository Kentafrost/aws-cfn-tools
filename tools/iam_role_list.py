# List of IAM roles
import time
import boto3
import pandas as pd
import os

def list_iam_roles():
    session = boto3.Session(region_name='ap-southeast-2', profile_name='default')
    iam_client = session.client('iam')
    
    response = iam_client.list_roles()
    roles = response['Roles']
    roles_list = []
    
    print("IAM Roles:")
    for role in roles:
        try:
            # if role['RoleType'] == "CUSTOMER":
            print(f"Role Name: {role['RoleName']}, ARN: {role['Arn']}")
            roles_list.append({
                'RoleName': role['RoleName'],
                'Arn': role['Arn']
            })
        except Exception as e:
            print(f"Error processing role {role['RoleName']}: {e}")
    
    return roles_list

if __name__ == "__main__":
    
    current_dir = os.path.dirname(os.path.abspath(__file__))
    service = 'iam-roles'
    current_time = time.strftime("%Y-%m-%d_%H-%M")
    log_file_path = os.path.join(f'{current_dir}/log/{service}', f'{current_time}.csv')

    if not os.path.exists(os.path.dirname(log_file_path)):
        os.makedirs(os.path.dirname(log_file_path))

    roles = list_iam_roles()
    df = pd.DataFrame(roles)
    df.to_csv(log_file_path, index=False)
    
    print("IAM roles have been listed and saved to the log file.")
