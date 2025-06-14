import os
import boto3

# check all instances status
def check_instances_status(client, instance_id):
    response = client.describe_instance_status(IncludeAllInstances=True, instance_id=instance_id)
    
    instances_status = response['InstanceStatuses']
    instances_status = [(instance['InstanceId'], instance['InstanceState']['Name']) for instance in instances_status]
    
    if not instances_status:
        print("No instances found or no status available.")
        return []
    return instances_status

if __name__ == "__main__":
    ec2_client = boto3.client('ec2', region_name='ap-southeast-2')
    instances_status = check_instances_status(ec2_client)
    for instance_id, status in instances_status:
        print(f"Instance ID: {instance_id}, Status: {status}")

    instance_id = 'i-xxxxxxxxxxxxxxxxx'  # Replace with your instance ID

    try:
        response = ec2_client.create_image(
            InstanceId=instance_id,
            Name='Windows-Server-2025-Backup',
            Description='AMI backup created from Windows Server 2025 instance',
            NoReboot=True 
        )
    except Exception as e:
        print(f"Error creating AMI: {e}")
        exit(1)
            
    # Print the AMI ID of the created image
    print("AMI creation is finished.")
    print("AMI ID:", response['ImageId'])