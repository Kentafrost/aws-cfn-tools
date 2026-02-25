# AWS CloudFormation Tools & Templates 🚀

This repository is a project aimed at learning and implementing infrastructure automation using AWS CloudFormation.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Plan Details](#plan-details)
- [Common Resources](#common-resources)
- [Usage](#usage)
- [Prerequisites](#prerequisites)

## 🎯 Project Overview

### **Technologies Being Learned**
- **AWS CloudFormation:** Automation of resource provisioning and infrastructure setup using YAML templates
- **Infrastructure as Code (IaC):** Implementation of best practices for reliable and repeatable cloud deployments
- **AWS Services:** Effective application building and management using EC2, S3, Lambda, and other foundational services

### **Current Development Goals**
- Implementation of application installation on EC2 instances and automatic updates using SSM Managers
- RUN command execution functionality for all EC2 instances
- Login system using HTML in S3 buckets (integrated with Lambda, PHP, API Gateway, DynamoDB)

## 📁 Folder Structure

```
aws-cfn-tools/
├── Plan1/          # VPC, S3 Endpoints, Lambda, S3 Replication
├── Plan2/          # HTML Data Processing and AWS Integration
├── Plan3/          # CloudWatch Logs-based Alert Workflow
├── Plan4/          # EC2 Instance Deployment (Windows Server + IIS)
├── Plan5/          # EC2 Instance Automated Management and EventBridge Integration
├── Plan6/          # AMI Lifecycle Automation and DLM
├── Plan7/          # ECR + Lambda Container Integration
├── Plan8/          # Additional Projects
├── common/         # Common Resource Templates
│   └── apse2/      # Templates for ap-southeast-2 Region
├── memo_to_add.md  # Project Memos and Future Features
├── test.yaml       # SSM Parameter Test Template
└── yaml_files_list.csv  # Catalog of All YAML Files
```

## 🔧 Plan Details

### Plan1: VPC Endpoints and S3 Integration
- **Purpose:** VPC endpoint-based access from Lambda functions to S3 buckets
- **Features:** Cross-region S3 bucket replication (Tokyo ⇔ Sydney)
- **Resources:** VPC, Route Tables, VPC Endpoints, Subnets, Security Groups, Lambda, S3

### Plan2: HTML Data Processing
- **Purpose:** HTML data management and AWS service integration
- **Files:** html_input_data.csv, configuration files

### Plan3: CloudWatch Logs Alert System
- **Workflow:** 
  ```
  Lambda → CloudWatch Logs → Metric Filter → CloudWatch Alarm → SNS → Lambda for Alarm → Email Notifications
  ```
- **Features:** Log pattern monitoring, metrics extraction, automatic alerts, email notifications

### Plan4: EC2 Instance Management
- **Platform:** Windows Server + IIS
- **Features:** CloudWatch Agent, SSM integration, website accessibility
- **Templates:**
  - `plan4-public-ec2-instance.yaml` - Public instance
  - `plan4-private-ec2-instance.yaml` - Private instance
  - `plan4-dynamodb-table.yaml` - DynamoDB table

### Plan5: EC2 Automated Management System
- **Features:** EC2 instance status checks and automatic shutdown
- **Workflow:** Lambda execution → Instance shutdown → SNS notification → Error handling
- **Monitoring:** CloudWatch Logs, metrics, alarms

### Plan6: AMI Lifecycle Management
- **Features:** Automation of AMI creation and EBS snapshots
- **Scheduling:** Regular backup creation
- **Notifications:** EventBridge rules and SNS integration
- **Scripts:** `create_ami.py` - AMI creation automation

### Plan7: ECR and Lambda Containers
- **Features:** ECR repository and Lambda container integration
- **Files:**
  - `plan7-ecr.yaml` - ECR repository
  - `plan7-ecr-lambda.yaml` - Lambda integration
  - `Dockerfile/` - Container definitions

## 🔄 Common Resources (common/apse2/)

### EC2 Related
- **ec2-keypair.yaml** - EC2 keypair configuration
- **ec2-setting-ssm.yaml** - SSM configuration
- **instance-profile.yaml** - Instance profile
- **common-security-group.yml** - Common security group

### IAM Related
- **lambda-iam-role.yaml** - Lambda execution role
- **public-ec2-iam-role.yaml** - Public EC2 role
- **priv-ec2-iam-role.yaml** - Private EC2 role
- **destination-s3-role.yaml** - S3 destination role

### S3 Related
- **common-s3-bucket.yaml** - Basic S3 bucket
- **common-s3-websites-bucket.yaml** - Website S3 bucket
- **common-s3-code-bucket.yaml** - Code storage S3 bucket

### Other Services
- **VPC/** - VPC configuration templates
- **Subnet/** - Subnet configuration
- **RouteTable/** - Route table configuration
- **SNS/** - Notification service configuration
- **CloudWatch/** - Monitoring configuration

## 🚀 Usage

### Basic Deployment
```bash
# Deploy common resources
aws cloudformation create-stack --stack-name common-resources --template-body file://common/apse2/[resource].yaml

# Deploy individual plans
aws cloudformation create-stack --stack-name plan1-resources --template-body file://Plan1/[template].yaml
```

### Prerequisites
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) - Configured with appropriate credentials
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) - For serverless templates
- [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) - For Python automation scripts
- Appropriate IAM permissions - Create and manage EC2, S3, IAM, CloudWatch resources

## 📊 Project Statistics
- **YAML Templates:** 30+ files
- **Target AWS Services:** EC2, S3, Lambda, CloudWatch, SNS, IAM, DynamoDB, ECR
- **Regions:** ap-southeast-2 (main), ap-northeast-1 (replication)
- **Automation Scripts:** Python (boto3), PowerShell

---

**Note:** Each plan folder contains detailed README.md files for specific implementation procedures and configuration details.
