import boto3
from botocore.exceptions import ClientError

# 全リージョンの全インスタンスのステータスを確認し、停止しているインスタンスを起動するスクリプト
def get_enabled_regions():
    """Get list of all enabled AWS regions"""
    try:
        account_client = boto3.client('account')
        regions_response = account_client.list_regions(
            RegionOptStatusContains=['ENABLED', 'ENABLED_BY_DEFAULT']
        )
        return [region['RegionName'] for region in regions_response['Regions']]
    except ClientError as e:
        print(f"Error getting regions: {e}")
        return []

def list_instance_ids_simple(ec2_client):
    try:
        response = ec2_client.describe_instances()
        instance_ids = []
        # Get instance id array
        for reservation in response['Reservations']:
            for instance in reservation['Instances']:
                instance_ids.append(instance['InstanceId'])
        if instance_ids == []:
            print("No instances found.")
            
        return instance_ids
    
    except ClientError as e:
        print(f"Error listing instances: {e}")
        return []

def check_instance_status(ec2_client, instance_id_list):
    try:
        # Get instance status
        for instance_id in instance_id_list:
            response = ec2_client.describe_instance_status(
                InstanceIds=[instance_id],
                IncludeAllInstances=True  # This will show status even if instance is stopped
            )
            
            if response['InstanceStatuses']:
                status = response['InstanceStatuses'][0]
                instance_state = status['InstanceState']['Name']
                instance_status = status.get('InstanceStatus', {}).get('Status')
                system_status = status.get('SystemStatus', {}).get('Status')
                
                print("以下、インスタンスリソースのデータを表示します。")
                print("-------------------------")
                print(f"Instance {instance_id}:")
                print(f"Instance State: {instance_state}")
                print(f"Instance Status: {instance_status}")
                print(f"System Status: {system_status}")
                print(f"Public IP: {status['PublicIpAddress']}")
                print("-------------------------")
                
                if instance_state == 'running':
                    running_instance = running_instance + 1
                    print(f"This Instance is running. Instance ID: {instance_id}")
                    ec2_client.stop_instances(InstanceIds=[instance_id])
                
                # 停止している場合、起動するか聞く。
                elif instance_state == 'stopped':
                    stopping_instance = stopping_instance + 1
                    print(f"Instance is stopped.  Instance ID: {instance_id}")
                    user_run_choice = input("Do you want to start this instance? (yes/no): ")
                    if user_run_choice == 'yes':
                        ec2_client.start_instances(InstanceIds=[instance_id])
                
                print(f"起動しているインスタンス数: {running_instance}")
                print(f"停止しているインスタンス数: {stopping_instance}")
    except ClientError as e:
        print(f"Error checking instance status: {e}")
        return None

if __name__ == "__main__":
    region_list = get_enabled_regions()
    
    for region in region_list:
        print(f"Region: {region}")
        ec2_client = boto3.client('ec2', region_name=region)
        instance_id_list = list_instance_ids_simple(ec2_client) # インスタンス配列作成
        check_instance_status(ec2_client, instance_id_list) # インスタンスのステータスを確認する関数