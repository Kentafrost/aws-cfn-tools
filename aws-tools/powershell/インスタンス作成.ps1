# Set your AWS region
$region = "ap-southeast-2"  # Replace with your desired region

# Set EC2 instance parameters
$amiId = "ami-08c4b0ab226451dc3"  # Replace with your desired AMI ID
$instanceType = "t2.micro"
$keyPairName = "KeyPair_PublicWindows"  # Replace with your key pair name
$securityGroupId = "sg-0b02e03f704c1f7cd"  # Replace with your security group ID
$subnetId = "subnet-0e6c8a4b5c041e33f"  # Replace with your subnet ID

# Create the EC2 instance
$instance = New-EC2Instance -ImageId $amiId -InstanceType $instanceType -KeyName $keyPairName -SecurityGroupId $securityGroupId -SubnetId $subnetId -Region $region

# Wait for the instance to be running
$instanceId = $instance.Instances[0].InstanceId
Write-Host "Waiting for instance $instanceId to start..."
Wait-EC2Instance -InstanceId $instanceId -Region $region


# Get the public IP address of the instance
$instanceInfo = Get-EC2Instance -InstanceId $instanceId -Region $region
$publicIp = $instanceInfo.Instances[0].PublicIpAddress

Write-Host "EC2 instance $instanceId is now running with public IP: $publicIp"