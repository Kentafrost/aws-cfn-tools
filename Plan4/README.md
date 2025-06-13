## Overview
This project automates the creation of AWS EC2 instances (public and private) with CloudWatch and SSM Agents installed. AMIs are created from the instances, and multiple instances are launched efficiently using EC2 Fleet.

## Prerequisites
Before proceeding, ensure you have:
- AWS CLI installed and configured
- Required IAM permissions for EC2, AMI, and EC2 Fleet operations
- A CloudFormation YAML file for infrastructure automation