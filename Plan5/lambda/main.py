import os
import boto3

# check all instances status
def check_instances_status(client):
    response = client.describe_instance_status(IncludeAllInstances=True)
    
    instances_status = []
    for instance in response['InstanceStatuses']:
        instance_id = instance['InstanceId']
        status = instance['InstanceState']['Name']
        instances_status.append((instance_id, status))
    
    return instances_status

def lambda_handler(event, context):
    ec2_client = boto3.client('ec2', region_name='ap-southeast-2')
    instances_status = check_instances_status(ec2_client)
    for instance_id, status in instances_status:
        print(f"Instance ID: {instance_id}, Status: {status}")
        
        if status == 'running':
            print(f"Instance ID: {instance_id} is running.")
            # stop the instance if needed
            ec2_client.stop_instances(InstanceIds=[instance_id])
        elif status == 'stopped':
            print(f"Instance ID: {instance_id} is stopped.")
    
    # Send email notification
    # SNS client
    sns_client = boto3.client('sns', region_name='ap-southeast-2')
    topic_arn = os.environ['SNS_TOPIC_ARN']
    message = "Instance status check completed. Please review the status of your instances."
    subject = "Instance Status Update"
    sns_client.publish(
        TopicArn=topic_arn,
        Message=message,
        Subject=subject
    )
    
    print("Email notification sent successfully.")