**Lambda function invoked by HTML file**

S3 Bucket ⇒ HTML URL ⇒ Javascript ⇒ API Gateway ⇒ Lambda 
⇒ retrive data from other services, and list up into csv ⇒ save into a S3 bucket.

**Requirement**
* S3 buckets policy that allows local user access, lambda functions.
* Set up Lambda, and API Gateway
* Make IAM role to enable list up resources in other services.

**Recipe**
* S3 bucket(one)
* Lambda function
* API Gateway
* IAM role
* HTML file with Javascript script

**Memo**
* Setting is OK
* Lambda ⇒ S3 Endpoint ⇒ S3 Endpoint

* But if I don't add, then it worked well
* Local PC ⇒ Website

* If I don't use VPC for lambda function, then this below worked well
* ⇒ at least SNS Endpoint's policy might be problem 

* Lambda ⇒ SNS Endpoint(Interface) ⇒ SNS ⇒ Publish

* Local PC(only allowed IP) ⇒ Website in S3 bucket ⇒ API GW ⇒ Lambda function ⇒ SNS topic publish
* URL access ⇒ API GW ⇒ Lambda function to SNS topic publish (need to restrict)

* Website in S3 bucket ⇒ API GW(OK so far) ⇒ Lambda function ⇒ Modify the data #
* ⇒ Put data into DynamoDB table
* ⇒ Send e-mail notification to my address