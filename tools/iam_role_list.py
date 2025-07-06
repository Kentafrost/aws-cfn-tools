# List of IAM roles
import boto3
import pandas as pd
import os

def list_iam_roles():
    session = boto3.Session(region_name='ap-southeast-2', profile_name='default')
    iam_client = session.client('iam')
    try:
        response = iam_client.list_roles()
        roles = response['Roles']
        roles_list = []
        
        print("IAM Roles:")
        for role in roles:
            # if role['RoleType'] == "CUSTOMER":
            print(f"Role Name: {role['RoleName']}, ARN: {role['Arn']}")
            roles_list.append({
                'RoleName': role['RoleName'],
                'Arn': role['Arn']
            })
        return roles_list
    except Exception as e:
        print(f"Error listing IAM roles: {e}")
        raise
    
if __name__ == "__main__":
    
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    roles = list_iam_roles()
    df = pd.DataFrame(roles)
    df.to_csv(os.path.join(current_dir, 'iam_roles.csv'), index=False)

    # You can process the roles further if needed
    # For example, save to a file or database
    # with open('iam_roles.txt', 'w') as f:
    #     for role in roles:
    #         f.write(f"Role Name: {role['RoleName']}, ARN: {role['Arn']}\n")