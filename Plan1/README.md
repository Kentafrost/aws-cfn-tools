# AWS CloudFormation Deployment Summary

## Objectives
- Enable access from Lambda function to S3 bucket through an S3 endpoint in VPC.
  - **Issue:** Authorization failure when accessing S3 bucket through endpoint.
  - **Solution:** Verify and update bucket policy, IAM role attached to Lambda function.
  - **Status** Solved.

- Enable S3 bucket replication between regions:
  - **Regions:** ap-northeast-1 (Tokyo) ⇔ ap-southeast-2 (Sydney).
  - **Status:** Completed.

## AWS CloudFormation Deployed Resources
1. **VPC**
2. **Route Table**
3. **VPC Endpoint**
4. **Subnet**
5. **Security Group**
6. **Lambda Function**
7. **S3 Bucket and S3 buckets policy**