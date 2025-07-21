import time
import boto3
import os

def ec2_instances_info():
    ec2 = boto3.client('ec2')
    response = ec2.describe_instances()

    instances_info = []
    for reservation in response['Reservations']:
        for instance in reservation['Instances']:
            instance_data = {
                'InstanceId': instance['InstanceId'],
                'State': instance['State']['Name'],
                'InstanceType': instance['InstanceType'],
                'LaunchTime': instance['LaunchTime'].isoformat(),
                'PublicIpAddress': instance.get('PublicIpAddress', 'N/A'),
                'PrivateIpAddress': instance.get('PrivateIpAddress', 'N/A'),
            }
            instances_info.append(instance_data)

    return instances_info

if __name__ == "__main__":
    instances = ec2_instances_info()
    
    current_dir = os.path.dirname(os.path.abspath(__file__))
    service = 'ec2-instances'
    current_time = time.strftime("%Y-%m-%d_%H-%M")
    
    log_file_path = os.path.join(f'{current_dir}\log\{service}', f'{current_time}.csv')
    
    if not os.path.exists(os.path.dirname(log_file_path)):
        os.makedirs(os.path.dirname(log_file_path))

    with open(log_file_path, 'w') as log_file:
        log_file.write("Instance ID,State,Type,Launch Time,Public IP Address,Private IP Address\n")
        for instance in instances:
            log_file.write(f"{instance['InstanceId']},{instance['State']},{instance['InstanceType']},"
                           f"{instance['LaunchTime']},{instance['PublicIpAddress']},{instance['PrivateIpAddress']}\n")

    
    print(f"EC2 instances information has been written to {log_file_path}")
    print("Please check the file for details.")