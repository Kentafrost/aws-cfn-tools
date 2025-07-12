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
    else:
        for instance_id, status in instances_status:
            print(f"Instance ID: {instance_id}, Status: {status}")
            instance_id_list = [instance_id for instance_id, status in instances_status if status == 'running']
            return instance_id_list

if __name__ == "__main__":
    ec2_client = boto3.client('ec2', region_name='ap-southeast-2')
    instance_id_list = check_instances_status(ec2_client)
    
    if instance_id_list == []:
        print("No instances found or instance status is not available.")
    
    else:
        # choose an instance from the list with 1, 2, 3, etc
        print("Available running instances:")
        
        try:
            for instance_id in instance_id_list:
                check = input(f"Do you want to create an AMI from instance {instance_id}? (yes/no): ").strip().lower()
                if check == "yes":
                    print(f"Creating AMI for instance: {instance_id}")

                    # Create an AMI from the specified instance
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