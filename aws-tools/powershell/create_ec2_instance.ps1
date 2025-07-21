$region = "ap-southeast-2"

$amiId = "ami-08c4b0ab226451dc3"
$instanceType = "t2.micro"
$keyPairName = "KeyPair_PublicWindows"
$securityGroupId = "sg-0b02e03f704c1f7cd"
$subnetId = "subnet-0e6c8a4b5c041e33f"

$instance = New-EC2Instance -ImageId $amiId -InstanceType $instanceType -KeyName $keyPairName -SecurityGroupId $securityGroupId -SubnetId $subnetId -Region $region

$instanceId = $instance.Instances[0].InstanceId
Write-Host "Waiting for instance $instanceId to start..."
Wait-EC2Instance -InstanceId $instanceId -Region $region

$instanceInfo = Get-EC2Instance -InstanceId $instanceId -Region $region
$publicIp = $instanceInfo.Instances[0].PublicIpAddress

Write-Host "EC2 instance $instanceId is now running with public IP: $publicIp"