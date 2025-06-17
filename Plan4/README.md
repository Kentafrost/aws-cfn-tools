## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [CloudFormation Templates](#cloudformation-templates)
- [Automation Scripts](#automation-scripts)
- [Troubleshooting](#troubleshooting)

---

## Project Structure

```
.
├── Plan4/
│   ├── plan4-public-ec2-instance.yaml
│   └── ...
├── common/
│   ├── apse2/
│   │   ├── EC2/
│   │   │   └── ec2-setting-ssm.yaml
│   │   ├── IAM/
│   │   │   └── public-ec2-iam-role.yaml
│   │   ├── S3/
│   │   │   └── common-s3-websites-bucket.yaml
│   │   └── common-security-group.yml
├── Plan6/
│   └── create_ami.py
└── README.md
```

---

## Prerequisites

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) configured with appropriate credentials.
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) (for `Transform: AWS::Serverless-2016-10-31` templates).
- [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) Python library for automation scripts.
- Sufficient IAM permissions to create and manage EC2, S3, IAM, and CloudWatch resources.

---

## CloudFormation Templates

- **EC2 Instance Deployment:**  
  `Plan4/plan4-public-ec2-instance.yaml`  
  Deploys a public Windows Server EC2 instance with IIS, CloudWatch Agent, and SSM integration.
  Be able to access from local PC to the website on this instance.

- **IAM Role Setup:**  
  `common/apse2/IAM/public-ec2-iam-role.yaml`  
  Defines IAM roles and policies for EC2 instances.
  
- **S3 Bucket Policy:**  
  `common/apse2/S3/common-s3-websites-bucket.yaml`  
  Configures S3 bucket access for website hosting and EC2 integration.

- **Security Groups:**  
  `common/apse2/common-security-group.yml`  
  Sets up security groups for public and private access.
  To enable access from local PC, and inside another public subnet.

- **DynamoDB Table:**
  `Plan4/plan4-dynamodb-table.yaml`  

- **Python scripts on EC2 instance:**
  `Plan4/python/dynamodb_put.py`
  Downloads csv file from S3 bucket, then put data into DynamoDB table.

---

## Automation Scripts

- **AMI Creation:**  
  `Plan6/create_ami.py`  
  Python script to create an Amazon Machine Image (AMI) from a running EC2 instance.

---

## Troubleshooting

- **Cannot access EC2 website:**  
  - Check security group rules for port 80.
  - Ensure IIS is installed and running.
  - Verify UserData execution and S3 permissions.

- **CloudWatch Agent not running:**  
  - Check IAM role permissions.
  - Review agent logs in `C:\ProgramData\Amazon\AmazonCloudWatchAgent\Logs\`.

- **Script errors:**  
  - Ensure all dependencies are installed.
  - Check AWS credentials and permissions.

---