window.CFN_RESOURCE_MAP = {
  "generatedAt": "2026-03-15T09:54:04.600Z",
  "rootDir": "C:\\Users\\kenta\\デスクトップ\\Git\\Public\\aws-cfn-tools",
  "stats": {
    "yamlFiles": 62,
    "resources": 173,
    "edges": 153,
    "parseErrors": 0,
    "cycles": 0,
    "ssmProduced": 58,
    "ssmConsumed": 95
  },
  "files": [
    {
      "path": ".github/workflows/main.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Other"
    },
    {
      "path": "common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
      "resourceCount": 7,
      "resources": [
        {
          "logicalId": "ApiGwLambdaMetricFilter",
          "type": "AWS::Logs::MetricFilter"
        },
        {
          "logicalId": "ApiGwLambdaLogAlarm",
          "type": "AWS::CloudWatch::Alarm"
        },
        {
          "logicalId": "EC2CheckInstancesLambdaMetricFilter",
          "type": "AWS::Logs::MetricFilter"
        },
        {
          "logicalId": "EC2CheckInstancesLambdaLogAlarm",
          "type": "AWS::CloudWatch::Alarm"
        },
        {
          "logicalId": "Plan7EcrLambdaMetricFilter",
          "type": "AWS::Logs::MetricFilter"
        },
        {
          "logicalId": "Plan7EcrLambdaLogAlarm",
          "type": "AWS::CloudWatch::Alarm"
        },
        {
          "logicalId": "S3PutObjectAlarm",
          "type": "AWS::CloudWatch::Alarm"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/WebS3BucketName",
        "/ErrorLambdaSNSTopic"
      ],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [
        {
          "file": "common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
          "resource": "ApiGwLambdaLogAlarm",
          "target": "ErrorSNSTopic",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
          "resource": "EC2CheckInstancesLambdaLogAlarm",
          "target": "ErrorSNSTopic",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
          "resource": "Plan7EcrLambdaLogAlarm",
          "target": "ErrorSNSTopic",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
          "resource": "S3PutObjectAlarm",
          "target": "WebS3BucketName",
          "kind": "Sub"
        },
        {
          "file": "common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
          "resource": "S3PutObjectAlarm",
          "target": "WebS3BucketName",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
          "resource": "S3PutObjectAlarm",
          "target": "ErrorSNSTopic",
          "kind": "Ref"
        }
      ],
      "part": "Common"
    },
    {
      "path": "common/apse2/EC2/common-security-group.yml",
      "resourceCount": 7,
      "resources": [
        {
          "logicalId": "LambdaSecurityGroup",
          "type": "AWS::EC2::SecurityGroup"
        },
        {
          "logicalId": "SNSEndpointSecurityGroup",
          "type": "AWS::EC2::SecurityGroup"
        },
        {
          "logicalId": "PublicEC2SecurityGroup",
          "type": "AWS::EC2::SecurityGroup"
        },
        {
          "logicalId": "PrivateEC2SecurityGroup",
          "type": "AWS::EC2::SecurityGroup"
        },
        {
          "logicalId": "SSMPublicEC2SecurityGroup",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMPrivateSecurityGroup",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "LambdaSecurityGroupSSM",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/VPC",
        "/MyIpAddress"
      ],
      "producedSsmParameterNames": [
        "PublicEC2SecurityGroup",
        "PrivateEC2SecurityGroup",
        "LambdaSecurityGroup"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "common/apse2/EC2/common-security-group.yml",
          "resource": "LambdaSecurityGroup",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/EC2/common-security-group.yml",
          "resource": "SNSEndpointSecurityGroup",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/EC2/common-security-group.yml",
          "resource": "PublicEC2SecurityGroup",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/EC2/common-security-group.yml",
          "resource": "PublicEC2SecurityGroup",
          "target": "MyIpAddress",
          "kind": "Sub"
        },
        {
          "file": "common/apse2/EC2/common-security-group.yml",
          "resource": "PrivateEC2SecurityGroup",
          "target": "Vpc",
          "kind": "Ref"
        }
      ],
      "part": "Common"
    },
    {
      "path": "common/apse2/EC2/ec2-keypair.yaml",
      "resourceCount": 4,
      "resources": [
        {
          "logicalId": "PublicKeyPair",
          "type": "AWS::EC2::KeyPair"
        },
        {
          "logicalId": "PrivateKeyPair",
          "type": "AWS::EC2::KeyPair"
        },
        {
          "logicalId": "SSMPublicKey",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMPrivateKey",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [
        "PublicKeypair",
        "PrivateKeypair"
      ],
      "unresolvedExternalRefs": [],
      "part": "Common"
    },
    {
      "path": "common/apse2/EC2/ec2-setting-ssm.yaml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "CWAgentConfig",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "EC2ScriptsSSM",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [
        "CWAgentConfig",
        "EC2ScriptsSSM"
      ],
      "unresolvedExternalRefs": [],
      "part": "Common"
    },
    {
      "path": "common/apse2/EC2/instance-profile.yaml",
      "resourceCount": 4,
      "resources": [
        {
          "logicalId": "PublicEC2InstanceProfile",
          "type": "AWS::IAM::InstanceProfile"
        },
        {
          "logicalId": "PrivateEC2InstanceProfile",
          "type": "AWS::IAM::InstanceProfile"
        },
        {
          "logicalId": "SSMPublicEC2Instanceprofile",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMPrivateEC2Instanceprofile",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/PublicEC2InstanceIAMRole",
        "/PrivateEC2InstanceIAMRole"
      ],
      "producedSsmParameterNames": [
        "PublicEC2InstanceProfile",
        "PrivateEC2InstanceProfile"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "common/apse2/EC2/instance-profile.yaml",
          "resource": "PublicEC2InstanceProfile",
          "target": "PublicEC2Role",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/EC2/instance-profile.yaml",
          "resource": "PrivateEC2InstanceProfile",
          "target": "PrivateEC2Role",
          "kind": "Ref"
        }
      ],
      "part": "Common"
    },
    {
      "path": "common/apse2/IAM/destination-s3-role.yaml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "S3ReplicationRole",
          "type": "AWS::IAM::Role"
        },
        {
          "logicalId": "S3RoleSSM",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [
        "S3ReplicationRole"
      ],
      "unresolvedExternalRefs": [],
      "part": "Common"
    },
    {
      "path": "common/apse2/IAM/lambda-iam-policy.yaml",
      "resourceCount": 5,
      "resources": [
        {
          "logicalId": "SendMsgPolicy",
          "type": "AWS::IAM::Policy"
        },
        {
          "logicalId": "EC2CheckInstancesPolicy",
          "type": "AWS::IAM::Policy"
        },
        {
          "logicalId": "LambdaS3AccessPolicy",
          "type": "AWS::IAM::Policy"
        },
        {
          "logicalId": "ECRLambdaPolicy",
          "type": "AWS::IAM::Policy"
        },
        {
          "logicalId": "LambdaDynamoDBPolicy",
          "type": "AWS::IAM::Policy"
        }
      ],
      "consumedSsmParameterDefaults": [
        "BasicLambdaRole",
        "LambdaECRExecutionRole",
        "DynamoDBLambdaRole",
        "ApiGwLambdaRole"
      ],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [
        {
          "file": "common/apse2/IAM/lambda-iam-policy.yaml",
          "resource": "SendMsgPolicy",
          "target": "BasicLambdaRole",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/IAM/lambda-iam-policy.yaml",
          "resource": "SendMsgPolicy",
          "target": "DynamoECRExecutionRole",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/IAM/lambda-iam-policy.yaml",
          "resource": "SendMsgPolicy",
          "target": "DynamoDBLambdaRole",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/IAM/lambda-iam-policy.yaml",
          "resource": "SendMsgPolicy",
          "target": "ApiGwLambdaRole",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/IAM/lambda-iam-policy.yaml",
          "resource": "EC2CheckInstancesPolicy",
          "target": "BasicLambdaRole",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/IAM/lambda-iam-policy.yaml",
          "resource": "EC2CheckInstancesPolicy",
          "target": "DynamoECRExecutionRole",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/IAM/lambda-iam-policy.yaml",
          "resource": "LambdaS3AccessPolicy",
          "target": "AWS::AccountId",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/IAM/lambda-iam-policy.yaml",
          "resource": "LambdaS3AccessPolicy",
          "target": "BasicLambdaRole",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/IAM/lambda-iam-policy.yaml",
          "resource": "LambdaS3AccessPolicy",
          "target": "DynamoECRExecutionRole",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/IAM/lambda-iam-policy.yaml",
          "resource": "LambdaS3AccessPolicy",
          "target": "DynamoDBLambdaRole",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/IAM/lambda-iam-policy.yaml",
          "resource": "ECRLambdaPolicy",
          "target": "DynamoECRExecutionRole",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/IAM/lambda-iam-policy.yaml",
          "resource": "LambdaDynamoDBPolicy",
          "target": "ApiGwLambdaRole",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/IAM/lambda-iam-policy.yaml",
          "resource": "LambdaDynamoDBPolicy",
          "target": "DynamoDBLambdaRole",
          "kind": "Ref"
        }
      ],
      "part": "Common"
    },
    {
      "path": "common/apse2/IAM/lambda-iam-role.yaml",
      "resourceCount": 8,
      "resources": [
        {
          "logicalId": "BasicLambdaRole",
          "type": "AWS::IAM::Role"
        },
        {
          "logicalId": "ECRLambdaRole",
          "type": "AWS::IAM::Role"
        },
        {
          "logicalId": "DynamoDBLambdaRole",
          "type": "AWS::IAM::Role"
        },
        {
          "logicalId": "ApiGwLambdaRole",
          "type": "AWS::IAM::Role"
        },
        {
          "logicalId": "BasicLambdaRoleSSM",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "LambdaRoleECRSSM",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "DynamoDBLambdaRoleSSM",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "ApiGwLambdaRoleSSM",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [
        "BasicLambdaRole",
        "LambdaECRExecutionRole",
        "DynamoDBLambdaRole",
        "ApiGwLambdaRole"
      ],
      "unresolvedExternalRefs": [],
      "part": "Common"
    },
    {
      "path": "common/apse2/IAM/priv-ec2-iam-role.yaml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "PrivateEC2Role",
          "type": "AWS::IAM::Role"
        },
        {
          "logicalId": "SSMPrivateEC2InstanceRole",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/LambdaS3BucketName",
        "/WebS3BucketName"
      ],
      "producedSsmParameterNames": [
        "PrivateEC2InstanceIAMRole"
      ],
      "unresolvedExternalRefs": [],
      "part": "Common"
    },
    {
      "path": "common/apse2/IAM/public-ec2-iam-role.yaml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "PublicEC2Role",
          "type": "AWS::IAM::Role"
        },
        {
          "logicalId": "SSMPublicEC2InstanceRole",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [
        "PublicEC2InstanceIAMRole"
      ],
      "unresolvedExternalRefs": [],
      "part": "Common"
    },
    {
      "path": "common/apse2/IAM/s3-iam-role.yaml",
      "resourceCount": 4,
      "resources": [
        {
          "logicalId": "S3ReplicationSourceRole",
          "type": "AWS::IAM::Role"
        },
        {
          "logicalId": "S3ReplicationDestinationRole",
          "type": "AWS::IAM::Role"
        },
        {
          "logicalId": "S3RoleSourceSSM",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "S3RoleDestinationSSM",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [
        "S3ReplicationSourceRole",
        "S3ReplicationDestinationRole"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "common/apse2/IAM/s3-iam-role.yaml",
          "resource": "S3ReplicationSourceRole",
          "target": "AWS::AccountId",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/IAM/s3-iam-role.yaml",
          "resource": "S3ReplicationSourceRole",
          "target": "AWS::AccountId",
          "kind": "Ref"
        }
      ],
      "part": "Common"
    },
    {
      "path": "common/apse2/IAM/source-s3-role.yaml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "S3ReplicationRole",
          "type": "AWS::IAM::Role"
        },
        {
          "logicalId": "S3RoleSSM",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [
        "S3ReplicationRole"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "common/apse2/IAM/source-s3-role.yaml",
          "resource": "S3ReplicationRole",
          "target": "AWS::AccountId",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/IAM/source-s3-role.yaml",
          "resource": "S3ReplicationRole",
          "target": "AWS::AccountId",
          "kind": "Ref"
        }
      ],
      "part": "Common"
    },
    {
      "path": "common/apse2/RouteTable/priv-route.yml",
      "resourceCount": 6,
      "resources": [
        {
          "logicalId": "PrivateRoutetable",
          "type": "AWS::EC2::RouteTable"
        },
        {
          "logicalId": "NatGateway",
          "type": "AWS::EC2::NatGateway"
        },
        {
          "logicalId": "PrivateRouteToInternet",
          "type": "AWS::EC2::Route"
        },
        {
          "logicalId": "AssoPrivSub1RT",
          "type": "AWS::EC2::SubnetRouteTableAssociation"
        },
        {
          "logicalId": "AssoPrivSub2RT",
          "type": "AWS::EC2::SubnetRouteTableAssociation"
        },
        {
          "logicalId": "SSMPrivRoutetable",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/VPC",
        "/PrivateSubnet1",
        "/PrivateSubnet2"
      ],
      "producedSsmParameterNames": [
        "PrivateRouteTable"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "common/apse2/RouteTable/priv-route.yml",
          "resource": "PrivateRoutetable",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/RouteTable/priv-route.yml",
          "resource": "NatGateway",
          "target": "NatEIP",
          "kind": "GetAtt"
        },
        {
          "file": "common/apse2/RouteTable/priv-route.yml",
          "resource": "NatGateway",
          "target": "PublicSubnet1",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/RouteTable/priv-route.yml",
          "resource": "AssoPrivSub1RT",
          "target": "PrivateSubnet1",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/RouteTable/priv-route.yml",
          "resource": "AssoPrivSub2RT",
          "target": "PrivateSubnet2",
          "kind": "Ref"
        }
      ],
      "part": "Common"
    },
    {
      "path": "common/apse2/RouteTable/public-route.yaml",
      "resourceCount": 7,
      "resources": [
        {
          "logicalId": "PublicRoutetable",
          "type": "AWS::EC2::RouteTable"
        },
        {
          "logicalId": "InternetGateway",
          "type": "AWS::EC2::InternetGateway"
        },
        {
          "logicalId": "AttachGateway",
          "type": "AWS::EC2::VPCGatewayAttachment"
        },
        {
          "logicalId": "PublicRoute",
          "type": "AWS::EC2::Route"
        },
        {
          "logicalId": "AssoPubSub1RT",
          "type": "AWS::EC2::SubnetRouteTableAssociation"
        },
        {
          "logicalId": "AssoPubSub2RT",
          "type": "AWS::EC2::SubnetRouteTableAssociation"
        },
        {
          "logicalId": "SSMPublicRoutetable",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/VPC",
        "/PublicSubnet1",
        "/PublicSubnet2"
      ],
      "producedSsmParameterNames": [
        "PublicRouteTable"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "common/apse2/RouteTable/public-route.yaml",
          "resource": "PublicRoutetable",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/RouteTable/public-route.yaml",
          "resource": "AttachGateway",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/RouteTable/public-route.yaml",
          "resource": "AssoPubSub1RT",
          "target": "PublicSubnet1",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/RouteTable/public-route.yaml",
          "resource": "AssoPubSub2RT",
          "target": "PublicSubnet2",
          "kind": "Ref"
        }
      ],
      "part": "Common"
    },
    {
      "path": "common/apse2/RouteTable/vpc-endpoint.yaml",
      "resourceCount": 6,
      "resources": [
        {
          "logicalId": "S3Endpoint",
          "type": "AWS::EC2::VPCEndpoint"
        },
        {
          "logicalId": "DynamoDBEndpoint",
          "type": "AWS::EC2::VPCEndpoint"
        },
        {
          "logicalId": "SNSEndpoint",
          "type": "AWS::EC2::VPCEndpoint"
        },
        {
          "logicalId": "SSMS3Endpoint",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMDynamoDBEndpoint",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMSNSEndpoint",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/VPC",
        "/PrivateSubnet1",
        "/PrivateSubnet2",
        "/PrivateRouteTable"
      ],
      "producedSsmParameterNames": [
        "S3EndpointId",
        "DynamoDBEndpointId",
        "SNSEndpointId"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
          "resource": "S3Endpoint",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
          "resource": "S3Endpoint",
          "target": "PrivateRoutetable",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
          "resource": "S3Endpoint",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
          "resource": "DynamoDBEndpoint",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
          "resource": "DynamoDBEndpoint",
          "target": "PrivateRoutetable",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
          "resource": "DynamoDBEndpoint",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
          "resource": "SNSEndpoint",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
          "resource": "SNSEndpoint",
          "target": "PrivateSubnet1",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
          "resource": "SNSEndpoint",
          "target": "PrivateSubnet2",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
          "resource": "SNSEndpoint",
          "target": "Vpc",
          "kind": "Ref"
        }
      ],
      "part": "Common"
    },
    {
      "path": "common/apse2/S3/common-s3-bucket.yaml",
      "resourceCount": 3,
      "resources": [
        {
          "logicalId": "CodeS3Bucket",
          "type": "AWS::S3::Bucket"
        },
        {
          "logicalId": "CodeBucketPolicy",
          "type": "AWS::S3::BucketPolicy"
        },
        {
          "logicalId": "CodeBucketSSM",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [
        "CodeS3BucketName"
      ],
      "unresolvedExternalRefs": [],
      "part": "Common"
    },
    {
      "path": "common/apse2/S3/common-s3-code-bucket.yaml",
      "resourceCount": 3,
      "resources": [
        {
          "logicalId": "CodeS3Bucket",
          "type": "AWS::S3::Bucket"
        },
        {
          "logicalId": "CodeBucketPolicy",
          "type": "AWS::S3::BucketPolicy"
        },
        {
          "logicalId": "CodeBucketSSM",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [
        "CodeS3BucketName"
      ],
      "unresolvedExternalRefs": [],
      "part": "Common"
    },
    {
      "path": "common/apse2/S3/common-s3-websites-bucket.yaml",
      "resourceCount": 3,
      "resources": [
        {
          "logicalId": "EC2WebsitesS3Bucket",
          "type": "AWS::S3::Bucket"
        },
        {
          "logicalId": "EC2WebsitesS3BucketPolicy",
          "type": "AWS::S3::BucketPolicy"
        },
        {
          "logicalId": "EC2WebsitesS3BucketSSM",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [
        "EC2WebsitesS3BucketName"
      ],
      "unresolvedExternalRefs": [],
      "part": "Common"
    },
    {
      "path": "common/apse2/SNS/common-sns.yaml",
      "resourceCount": 18,
      "resources": [
        {
          "logicalId": "basicLambdaSNSTopic",
          "type": "AWS::SNS::Topic"
        },
        {
          "logicalId": "basicLambdaTopicPolicy",
          "type": "AWS::SNS::TopicPolicy"
        },
        {
          "logicalId": "basicLambdaSNSTopicSubscription",
          "type": "AWS::SNS::Subscription"
        },
        {
          "logicalId": "CWInvokeLambdaTopic",
          "type": "AWS::SNS::Topic"
        },
        {
          "logicalId": "ErrorLambdaSNSTopic",
          "type": "AWS::SNS::Topic"
        },
        {
          "logicalId": "ErrorLambdaTopicPolicy",
          "type": "AWS::SNS::TopicPolicy"
        },
        {
          "logicalId": "ErrorSNSTopicSubscription",
          "type": "AWS::SNS::Subscription"
        },
        {
          "logicalId": "ErrorMailAddressSNSTopic",
          "type": "AWS::SNS::Topic"
        },
        {
          "logicalId": "ErrorMailAddressLambdaTopicPolicy",
          "type": "AWS::SNS::TopicPolicy"
        },
        {
          "logicalId": "ErrorMailAddressSNSTopicSubscription1",
          "type": "AWS::SNS::Subscription"
        },
        {
          "logicalId": "ErrorMailAddressSNSTopicSubscription2",
          "type": "AWS::SNS::Subscription"
        },
        {
          "logicalId": "DLMNotificationsSNSTopic",
          "type": "AWS::SNS::Topic"
        },
        {
          "logicalId": "DLMNotificationsSNSTopicPolicy",
          "type": "AWS::SNS::TopicPolicy"
        },
        {
          "logicalId": "DLMNotificationsSNSTopicSubscription",
          "type": "AWS::SNS::Subscription"
        },
        {
          "logicalId": "SSMbasicSNSTopic",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMCWInvokeLambdaTopic",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMErrorLambdaSNSTopic",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMErrorMailAddressSNSTopic",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/my_main_gmail_address",
        "/my_main_tel_number",
        "/ErrorLambdaFunctionName"
      ],
      "producedSsmParameterNames": [
        "/basicSNSTopic",
        "/CWInvokeLambdaTopic",
        "/ErrorLambdaSNSTopic",
        "/ErrorMailAddressSNSTopic"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "common/apse2/SNS/common-sns.yaml",
          "resource": "basicLambdaSNSTopicSubscription",
          "target": "gmailAddress",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/SNS/common-sns.yaml",
          "resource": "ErrorSNSTopicSubscription",
          "target": "ErrorLambdaName",
          "kind": "Sub"
        },
        {
          "file": "common/apse2/SNS/common-sns.yaml",
          "resource": "ErrorMailAddressSNSTopicSubscription1",
          "target": "gmailAddress",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/SNS/common-sns.yaml",
          "resource": "ErrorMailAddressSNSTopicSubscription2",
          "target": "phonenumber",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/SNS/common-sns.yaml",
          "resource": "DLMNotificationsSNSTopicSubscription",
          "target": "gmailAddress",
          "kind": "Ref"
        }
      ],
      "part": "Common"
    },
    {
      "path": "common/apse2/Subnet/common-subnet.yml",
      "resourceCount": 8,
      "resources": [
        {
          "logicalId": "PublicSubnet1",
          "type": "AWS::EC2::Subnet"
        },
        {
          "logicalId": "PublicSubnet2",
          "type": "AWS::EC2::Subnet"
        },
        {
          "logicalId": "PrivateSubnet1",
          "type": "AWS::EC2::Subnet"
        },
        {
          "logicalId": "PrivateSubnet2",
          "type": "AWS::EC2::Subnet"
        },
        {
          "logicalId": "SSMPublicSubnet",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMPublicSubnet2",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMPrivateSubnet",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMPrivateSubnet2",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/VPC"
      ],
      "producedSsmParameterNames": [
        "PublicSubnet1",
        "PublicSubnet2",
        "PrivateSubnet1",
        "PrivateSubnet2"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "common/apse2/Subnet/common-subnet.yml",
          "resource": "PublicSubnet1",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/Subnet/common-subnet.yml",
          "resource": "PublicSubnet2",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/Subnet/common-subnet.yml",
          "resource": "PrivateSubnet1",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/Subnet/common-subnet.yml",
          "resource": "PrivateSubnet2",
          "target": "Vpc",
          "kind": "Ref"
        }
      ],
      "part": "Common"
    },
    {
      "path": "common/apse2/Subnet/subnet.yml",
      "resourceCount": 8,
      "resources": [
        {
          "logicalId": "PublicSubnet1",
          "type": "AWS::EC2::Subnet"
        },
        {
          "logicalId": "PublicSubnet2",
          "type": "AWS::EC2::Subnet"
        },
        {
          "logicalId": "PrivateSubnet1",
          "type": "AWS::EC2::Subnet"
        },
        {
          "logicalId": "PrivateSubnet2",
          "type": "AWS::EC2::Subnet"
        },
        {
          "logicalId": "SSMPublicSubnet",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMPublicSubnet2",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMPrivateSubnet",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMPrivateSubnet2",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/VPC"
      ],
      "producedSsmParameterNames": [
        "PublicSubnet1",
        "PublicSubnet2",
        "PrivateSubnet1",
        "PrivateSubnet2"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "common/apse2/Subnet/subnet.yml",
          "resource": "PublicSubnet1",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/Subnet/subnet.yml",
          "resource": "PublicSubnet2",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/Subnet/subnet.yml",
          "resource": "PrivateSubnet1",
          "target": "Vpc",
          "kind": "Ref"
        },
        {
          "file": "common/apse2/Subnet/subnet.yml",
          "resource": "PrivateSubnet2",
          "target": "Vpc",
          "kind": "Ref"
        }
      ],
      "part": "Common"
    },
    {
      "path": "common/apse2/VPC/common-vpc.yml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "Vpc",
          "type": "AWS::EC2::VPC"
        },
        {
          "logicalId": "SSMVpc",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [
        "VPC"
      ],
      "unresolvedExternalRefs": [],
      "part": "Common"
    },
    {
      "path": "common/apse2/VPC/vpc.yml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "Vpc",
          "type": "AWS::EC2::VPC"
        },
        {
          "logicalId": "SSMVpc",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [
        "VPC"
      ],
      "unresolvedExternalRefs": [],
      "part": "Common"
    },
    {
      "path": "Plan1/apne1/plan1-apne1-s3.yml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "DestinationS3Bucket",
          "type": "AWS::S3::Bucket"
        },
        {
          "logicalId": "S3BucketPolicy",
          "type": "AWS::S3::BucketPolicy"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/S3ReplicationRole"
      ],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [
        {
          "file": "Plan1/apne1/plan1-apne1-s3.yml",
          "resource": "S3BucketPolicy",
          "target": "ReplicationRoleArn",
          "kind": "Ref"
        }
      ],
      "part": "Plan1"
    },
    {
      "path": "Plan1/apse2/plan1-apse2-s3.yaml",
      "resourceCount": 3,
      "resources": [
        {
          "logicalId": "lambdaS3Bucket",
          "type": "AWS::S3::Bucket"
        },
        {
          "logicalId": "lambdaS3BucketPolicy",
          "type": "AWS::S3::BucketPolicy"
        },
        {
          "logicalId": "lambdaS3BucketSSM",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/S3ReplicationRole",
        "/LambdaExecutionRole",
        "/S3EndpointId"
      ],
      "producedSsmParameterNames": [
        "LambdaS3BucketName"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "Plan1/apse2/plan1-apse2-s3.yaml",
          "resource": "lambdaS3Bucket",
          "target": "S3ReplicationRoleArn",
          "kind": "Ref"
        },
        {
          "file": "Plan1/apse2/plan1-apse2-s3.yaml",
          "resource": "lambdaS3BucketPolicy",
          "target": "LambdaExecutionRoleArn",
          "kind": "Ref"
        },
        {
          "file": "Plan1/apse2/plan1-apse2-s3.yaml",
          "resource": "lambdaS3BucketPolicy",
          "target": "S3EndpointId",
          "kind": "Ref"
        }
      ],
      "part": "Plan1"
    },
    {
      "path": "Plan1/apse2/plan1-lambda.yaml",
      "resourceCount": 1,
      "resources": [
        {
          "logicalId": "MyLambdaFunction",
          "type": "AWS::Lambda::Function"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/PrivateSubnet1",
        "/PrivateSubnet2",
        "/LambdaSecurityGroup",
        "/LambdaS3BucketName",
        "/CodeS3BucketName"
      ],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [
        {
          "file": "Plan1/apse2/plan1-lambda.yaml",
          "resource": "MyLambdaFunction",
          "target": "CodeS3Bucket",
          "kind": "Ref"
        },
        {
          "file": "Plan1/apse2/plan1-lambda.yaml",
          "resource": "MyLambdaFunction",
          "target": "PrivSubnetId1",
          "kind": "Ref"
        },
        {
          "file": "Plan1/apse2/plan1-lambda.yaml",
          "resource": "MyLambdaFunction",
          "target": "PrivSubnetId2",
          "kind": "Ref"
        },
        {
          "file": "Plan1/apse2/plan1-lambda.yaml",
          "resource": "MyLambdaFunction",
          "target": "SecurityGroupId",
          "kind": "Ref"
        },
        {
          "file": "Plan1/apse2/plan1-lambda.yaml",
          "resource": "MyLambdaFunction",
          "target": "LambdaS3BucketName",
          "kind": "Ref"
        }
      ],
      "part": "Plan1"
    },
    {
      "path": "Plan2/aws/plan2-apigw.yaml",
      "resourceCount": 6,
      "resources": [
        {
          "logicalId": "ApiToLambda",
          "type": "AWS::ApiGateway::RestApi"
        },
        {
          "logicalId": "ApiToLambdaResource",
          "type": "AWS::ApiGateway::Resource"
        },
        {
          "logicalId": "ApiToLambdaMethod",
          "type": "AWS::ApiGateway::Method"
        },
        {
          "logicalId": "LambdaApiInvokePermission",
          "type": "AWS::Lambda::Permission"
        },
        {
          "logicalId": "ApiToLambdaOptionsMethod",
          "type": "AWS::ApiGateway::Method"
        },
        {
          "logicalId": "ApiDeployment",
          "type": "AWS::ApiGateway::Deployment"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/ApiGWLambdaFunctionName",
        "/ApiGWLambdaFunctionArn"
      ],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [
        {
          "file": "Plan2/aws/plan2-apigw.yaml",
          "resource": "ApiToLambdaMethod",
          "target": "LambdaFunctionArn",
          "kind": "Sub"
        },
        {
          "file": "Plan2/aws/plan2-apigw.yaml",
          "resource": "LambdaApiInvokePermission",
          "target": "LambdaFunctionName",
          "kind": "Ref"
        }
      ],
      "part": "Plan2"
    },
    {
      "path": "Plan2/aws/plan2-apse2-s3.yaml",
      "resourceCount": 3,
      "resources": [
        {
          "logicalId": "WebS3Bucket",
          "type": "AWS::S3::Bucket"
        },
        {
          "logicalId": "WebS3BucketPolicy",
          "type": "AWS::S3::BucketPolicy"
        },
        {
          "logicalId": "WebS3BucketSSM",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/LambdaExecutionRole",
        "/PublicEC2InstanceIAMRole",
        "/MyIpAddress",
        "/PublicSubnet1",
        "/PublicSubnet2"
      ],
      "producedSsmParameterNames": [
        "WebS3BucketName"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "Plan2/aws/plan2-apse2-s3.yaml",
          "resource": "WebS3BucketPolicy",
          "target": "MyIpAddress",
          "kind": "Sub"
        }
      ],
      "part": "Plan2"
    },
    {
      "path": "Plan2/aws/plan2-lambda-data-modification.yaml",
      "resourceCount": 3,
      "resources": [
        {
          "logicalId": "ApiGwLambdaFunction",
          "type": "AWS::Lambda::Function"
        },
        {
          "logicalId": "SSMLambdaFunctionName",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMLambdaFunctionArn",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/VPC",
        "/PrivateSubnet1",
        "/PrivateSubnet2",
        "/LambdaSecurityGroup",
        "/WebS3BucketName",
        "/CodeS3BucketName",
        "/basicSNSTopic"
      ],
      "producedSsmParameterNames": [
        "/ApiGWLambdaFunctionName",
        "/ApiGWLambdaFunctionArn"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "Plan2/aws/plan2-lambda-data-modification.yaml",
          "resource": "ApiGwLambdaFunction",
          "target": "CodeS3Bucket",
          "kind": "Ref"
        },
        {
          "file": "Plan2/aws/plan2-lambda-data-modification.yaml",
          "resource": "ApiGwLambdaFunction",
          "target": "AWS::AccountId",
          "kind": "Ref"
        },
        {
          "file": "Plan2/aws/plan2-lambda-data-modification.yaml",
          "resource": "ApiGwLambdaFunction",
          "target": "WebS3BucketName",
          "kind": "Ref"
        },
        {
          "file": "Plan2/aws/plan2-lambda-data-modification.yaml",
          "resource": "ApiGwLambdaFunction",
          "target": "basicSNSTopicArn",
          "kind": "Ref"
        }
      ],
      "part": "Plan2"
    },
    {
      "path": "Plan2/aws/plan2-lambda-input-into-dynamodb.yaml",
      "resourceCount": 3,
      "resources": [
        {
          "logicalId": "ApiGwLambdaFunction",
          "type": "AWS::Lambda::Function"
        },
        {
          "logicalId": "SSMLambdaFunctionName",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMLambdaFunctionArn",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/VPC",
        "/PrivateSubnet1",
        "/PrivateSubnet2",
        "/LambdaSecurityGroup",
        "/WebS3BucketName",
        "/CodeS3BucketName",
        "/basicSNSTopic"
      ],
      "producedSsmParameterNames": [
        "/ApiGWLambdaFunctionName",
        "/ApiGWLambdaFunctionArn"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "Plan2/aws/plan2-lambda-input-into-dynamodb.yaml",
          "resource": "ApiGwLambdaFunction",
          "target": "CodeS3Bucket",
          "kind": "Ref"
        },
        {
          "file": "Plan2/aws/plan2-lambda-input-into-dynamodb.yaml",
          "resource": "ApiGwLambdaFunction",
          "target": "AWS::AccountId",
          "kind": "Ref"
        },
        {
          "file": "Plan2/aws/plan2-lambda-input-into-dynamodb.yaml",
          "resource": "ApiGwLambdaFunction",
          "target": "WebS3BucketName",
          "kind": "Ref"
        },
        {
          "file": "Plan2/aws/plan2-lambda-input-into-dynamodb.yaml",
          "resource": "ApiGwLambdaFunction",
          "target": "basicSNSTopicArn",
          "kind": "Ref"
        }
      ],
      "part": "Plan2"
    },
    {
      "path": "Plan2/aws/plan2-lambda-login-data.yaml",
      "resourceCount": 3,
      "resources": [
        {
          "logicalId": "ApiGwLambdaFunction",
          "type": "AWS::Lambda::Function"
        },
        {
          "logicalId": "SSMLambdaFunctionName",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "SSMLambdaFunctionArn",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/LambdaSecurityGroup",
        "/WebS3BucketName",
        "/CodeS3BucketName",
        "/basicSNSTopic"
      ],
      "producedSsmParameterNames": [
        "/ApiGWLambdaFunctionName",
        "/ApiGWLambdaFunctionArn"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "Plan2/aws/plan2-lambda-login-data.yaml",
          "resource": "ApiGwLambdaFunction",
          "target": "CodeS3Bucket",
          "kind": "Ref"
        },
        {
          "file": "Plan2/aws/plan2-lambda-login-data.yaml",
          "resource": "ApiGwLambdaFunction",
          "target": "AWS::AccountId",
          "kind": "Ref"
        },
        {
          "file": "Plan2/aws/plan2-lambda-login-data.yaml",
          "resource": "ApiGwLambdaFunction",
          "target": "WebS3BucketName",
          "kind": "Ref"
        },
        {
          "file": "Plan2/aws/plan2-lambda-login-data.yaml",
          "resource": "ApiGwLambdaFunction",
          "target": "basicSNSTopicArn",
          "kind": "Ref"
        }
      ],
      "part": "Plan2"
    },
    {
      "path": "Plan2/old/zip_package/create-html/vendor/bref/bref/serverless.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan2"
    },
    {
      "path": "Plan2/old/zip_package/create-html/vendor/bref/bref/template/function/serverless.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan2"
    },
    {
      "path": "Plan2/old/zip_package/create-html/vendor/bref/bref/template/http/serverless.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan2"
    },
    {
      "path": "Plan2/old/zip_package/create-html/vendor/bref/bref/template/symfony/serverless.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan2"
    },
    {
      "path": "Plan2/old/zip_package/create-html/vendor/riverline/multipart-parser/.github/workflows/php.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan2"
    },
    {
      "path": "Plan2/old/zip_package/login/vendor/bref/bref/serverless.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan2"
    },
    {
      "path": "Plan2/old/zip_package/login/vendor/bref/bref/template/function/serverless.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan2"
    },
    {
      "path": "Plan2/old/zip_package/login/vendor/bref/bref/template/http/serverless.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan2"
    },
    {
      "path": "Plan2/old/zip_package/login/vendor/bref/bref/template/symfony/serverless.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan2"
    },
    {
      "path": "Plan2/old/zip_package/login/vendor/riverline/multipart-parser/.github/workflows/php.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan2"
    },
    {
      "path": "Plan2/zip_package/login/vendor/bref/bref/serverless.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan2"
    },
    {
      "path": "Plan2/zip_package/login/vendor/bref/bref/template/function/serverless.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan2"
    },
    {
      "path": "Plan2/zip_package/login/vendor/bref/bref/template/http/serverless.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan2"
    },
    {
      "path": "Plan2/zip_package/login/vendor/bref/bref/template/symfony/serverless.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan2"
    },
    {
      "path": "Plan2/zip_package/login/vendor/riverline/multipart-parser/.github/workflows/php.yml",
      "resourceCount": 0,
      "resources": [],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan2"
    },
    {
      "path": "Plan3/plan3-lambda.yaml",
      "resourceCount": 3,
      "resources": [
        {
          "logicalId": "ErrorLambdaFunction",
          "type": "AWS::Lambda::Function"
        },
        {
          "logicalId": "ErrorLambdaFunctionTrigger",
          "type": "AWS::Lambda::Permission"
        },
        {
          "logicalId": "SSMLambdaFunctionArn",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/CodeS3BucketName",
        "/ErrorLambdaSNSTopic",
        "/ErrorMailAddressSNSTopic"
      ],
      "producedSsmParameterNames": [
        "/ErrorLambdaFunctionName"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "Plan3/plan3-lambda.yaml",
          "resource": "ErrorLambdaFunction",
          "target": "CodeS3Bucket",
          "kind": "Ref"
        },
        {
          "file": "Plan3/plan3-lambda.yaml",
          "resource": "ErrorLambdaFunction",
          "target": "AWS::AccountId",
          "kind": "Ref"
        },
        {
          "file": "Plan3/plan3-lambda.yaml",
          "resource": "ErrorLambdaFunction",
          "target": "ErrorMailAddressSNSTopicArn",
          "kind": "Ref"
        },
        {
          "file": "Plan3/plan3-lambda.yaml",
          "resource": "ErrorLambdaFunctionTrigger",
          "target": "ErrorSNSTriggerTopicArn",
          "kind": "Ref"
        }
      ],
      "part": "Plan3"
    },
    {
      "path": "Plan4/plan4-dynamodb-table.yaml",
      "resourceCount": 1,
      "resources": [
        {
          "logicalId": "Plan4DynamoDBTable",
          "type": "AWS::DynamoDB::Table"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan4"
    },
    {
      "path": "Plan4/plan4-private-ec2-instance.yaml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "PrivateInstance",
          "type": "AWS::EC2::Instance"
        },
        {
          "logicalId": "SSMPrivateEC2Instance",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/PrivateSubnet1",
        "/PrivateEC2SecurityGroup",
        "/PrivateKeypair",
        "/PrivateEC2InstanceProfile",
        "/CWAgentConfig",
        "/EC2ScriptsSSM"
      ],
      "producedSsmParameterNames": [
        "PrivateEC2Instance"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "Plan4/plan4-private-ec2-instance.yaml",
          "resource": "PrivateInstance",
          "target": "PrivateKeyPair",
          "kind": "Ref"
        },
        {
          "file": "Plan4/plan4-private-ec2-instance.yaml",
          "resource": "PrivateInstance",
          "target": "PrivateSubnet",
          "kind": "Ref"
        },
        {
          "file": "Plan4/plan4-private-ec2-instance.yaml",
          "resource": "PrivateInstance",
          "target": "PrivateSecurityGroup",
          "kind": "Ref"
        },
        {
          "file": "Plan4/plan4-private-ec2-instance.yaml",
          "resource": "PrivateInstance",
          "target": "PrivateEC2InstanceProfile",
          "kind": "Ref"
        },
        {
          "file": "Plan4/plan4-private-ec2-instance.yaml",
          "resource": "PrivateInstance",
          "target": "EC2ScriptsSSM",
          "kind": "Ref"
        },
        {
          "file": "Plan4/plan4-private-ec2-instance.yaml",
          "resource": "PrivateInstance",
          "target": "CWAgentConfig",
          "kind": "Ref"
        }
      ],
      "part": "Plan4"
    },
    {
      "path": "Plan4/plan4-public-ec2-instance.yaml",
      "resourceCount": 3,
      "resources": [
        {
          "logicalId": "PublicInstance",
          "type": "AWS::EC2::Instance"
        },
        {
          "logicalId": "PublicEBSVolume",
          "type": "AWS::EC2::Volume"
        },
        {
          "logicalId": "SSMPublicEC2Instance",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/PublicSubnet1",
        "/PublicEC2SecurityGroup",
        "/PublicKeypair",
        "/PublicEC2InstanceProfile",
        "/CWAgentConfig",
        "/EC2ScriptsSSM"
      ],
      "producedSsmParameterNames": [
        "PublicEC2Instance"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "Plan4/plan4-public-ec2-instance.yaml",
          "resource": "PublicInstance",
          "target": "PublicKeyPair",
          "kind": "Ref"
        },
        {
          "file": "Plan4/plan4-public-ec2-instance.yaml",
          "resource": "PublicInstance",
          "target": "PublicVolume",
          "kind": "Ref"
        },
        {
          "file": "Plan4/plan4-public-ec2-instance.yaml",
          "resource": "PublicInstance",
          "target": "PublicSubnet1",
          "kind": "Ref"
        },
        {
          "file": "Plan4/plan4-public-ec2-instance.yaml",
          "resource": "PublicInstance",
          "target": "PublicSecurityGroup",
          "kind": "Ref"
        },
        {
          "file": "Plan4/plan4-public-ec2-instance.yaml",
          "resource": "PublicInstance",
          "target": "PublicEC2InstanceProfile",
          "kind": "Ref"
        },
        {
          "file": "Plan4/plan4-public-ec2-instance.yaml",
          "resource": "PublicInstance",
          "target": "EC2ScriptsSSM",
          "kind": "Ref"
        },
        {
          "file": "Plan4/plan4-public-ec2-instance.yaml",
          "resource": "PublicInstance",
          "target": "CWAgentConfig",
          "kind": "Ref"
        }
      ],
      "part": "Plan4"
    },
    {
      "path": "Plan5/plan5-evb.yaml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "EC2CheckInstancesEventRule",
          "type": "AWS::Events::Rule"
        },
        {
          "logicalId": "LambdaPermissionForEventBridge",
          "type": "AWS::Lambda::Permission"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/EC2CheckInstancesLambdaFunctionName"
      ],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [
        {
          "file": "Plan5/plan5-evb.yaml",
          "resource": "EC2CheckInstancesEventRule",
          "target": "lambdaFunctionName",
          "kind": "Sub"
        },
        {
          "file": "Plan5/plan5-evb.yaml",
          "resource": "EC2CheckInstancesEventRule",
          "target": "lambdaFunctionName",
          "kind": "Sub"
        },
        {
          "file": "Plan5/plan5-evb.yaml",
          "resource": "LambdaPermissionForEventBridge",
          "target": "lambdaFunctionName",
          "kind": "Ref"
        }
      ],
      "part": "Plan5"
    },
    {
      "path": "Plan5/plan5-lambda.yaml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "EC2CheckInstancesLambdaFunction",
          "type": "AWS::Lambda::Function"
        },
        {
          "logicalId": "SSMEC2CheckInstancesLambdaFunctionArn",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/CodeS3BucketName",
        "/basicSNSTopic"
      ],
      "producedSsmParameterNames": [
        "/EC2CheckInstancesLambdaFunctionName"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "Plan5/plan5-lambda.yaml",
          "resource": "EC2CheckInstancesLambdaFunction",
          "target": "CodeS3Bucket",
          "kind": "Ref"
        },
        {
          "file": "Plan5/plan5-lambda.yaml",
          "resource": "EC2CheckInstancesLambdaFunction",
          "target": "AWS::AccountId",
          "kind": "Ref"
        },
        {
          "file": "Plan5/plan5-lambda.yaml",
          "resource": "EC2CheckInstancesLambdaFunction",
          "target": "basicSNSTopicArn",
          "kind": "Ref"
        }
      ],
      "part": "Plan5"
    },
    {
      "path": "Plan6/old/plan6-ec2-fleet-instances.yaml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "MyEC2Fleet",
          "type": "AWS::EC2::EC2Fleet"
        },
        {
          "logicalId": "PublicLaunchTemplate",
          "type": "AWS::EC2::LaunchTemplate"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/PublicEC2SecurityGroup",
        "/PrivateEC2SecurityGroup",
        "/PublicKeypair"
      ],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [
        {
          "file": "Plan6/old/plan6-ec2-fleet-instances.yaml",
          "resource": "PublicLaunchTemplate",
          "target": "PublicEC2SecurityGroup",
          "kind": "Ref"
        },
        {
          "file": "Plan6/old/plan6-ec2-fleet-instances.yaml",
          "resource": "PublicLaunchTemplate",
          "target": "PublicKeyPair",
          "kind": "Ref"
        }
      ],
      "part": "Plan6"
    },
    {
      "path": "Plan6/plan6-ec2-templates.yaml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "PublicEC2LaunchTemplate",
          "type": "AWS::EC2::LaunchTemplate"
        },
        {
          "logicalId": "PublicEC2AutoScalingGroup",
          "type": "AWS::AutoScaling::AutoScalingGroup"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/PublicSubnet1",
        "/PublicEC2SecurityGroup",
        "/PublicKeypair",
        "/PublicEC2InstanceProfile"
      ],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [
        {
          "file": "Plan6/plan6-ec2-templates.yaml",
          "resource": "PublicEC2LaunchTemplate",
          "target": "PublicSecurityGroup",
          "kind": "Ref"
        },
        {
          "file": "Plan6/plan6-ec2-templates.yaml",
          "resource": "PublicEC2LaunchTemplate",
          "target": "PublicKeyPair",
          "kind": "Ref"
        },
        {
          "file": "Plan6/plan6-ec2-templates.yaml",
          "resource": "PublicEC2LaunchTemplate",
          "target": "PublicEC2InstanceProfile",
          "kind": "Ref"
        },
        {
          "file": "Plan6/plan6-ec2-templates.yaml",
          "resource": "PublicEC2AutoScalingGroup",
          "target": "PublicSubnet",
          "kind": "Ref"
        }
      ],
      "part": "Plan6"
    },
    {
      "path": "Plan6/plan6-eventbridge.yaml",
      "resourceCount": 1,
      "resources": [
        {
          "logicalId": "DLMEventRule",
          "type": "AWS::Events::Rule"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan6"
    },
    {
      "path": "Plan6/plan6-lifecycle-manager.yaml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "PublicEC2AMILifecyclePolicy",
          "type": "AWS::DLM::LifecyclePolicy"
        },
        {
          "logicalId": "PublicEBSVolumeLifecyclePolicy",
          "type": "AWS::DLM::LifecyclePolicy"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [],
      "part": "Plan6"
    },
    {
      "path": "Plan7/plan7-ecr-lambda.yaml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "ECRLambdaFunction",
          "type": "AWS::Lambda::Function"
        },
        {
          "logicalId": "SSMECRLambdaFunctionArn",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/LambdaECRExecutionRole",
        "/basicSNSTopic",
        "/Plan7EcrRepository",
        "/WebS3BucketName"
      ],
      "producedSsmParameterNames": [
        "/ECRLambdaFunctionName"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "Plan7/plan7-ecr-lambda.yaml",
          "resource": "ECRLambdaFunction",
          "target": "ecrRepositoryName",
          "kind": "Sub"
        },
        {
          "file": "Plan7/plan7-ecr-lambda.yaml",
          "resource": "ECRLambdaFunction",
          "target": "AWS::AccountId",
          "kind": "Ref"
        },
        {
          "file": "Plan7/plan7-ecr-lambda.yaml",
          "resource": "ECRLambdaFunction",
          "target": "basicSNSTopicArn",
          "kind": "Ref"
        },
        {
          "file": "Plan7/plan7-ecr-lambda.yaml",
          "resource": "ECRLambdaFunction",
          "target": "WebS3BucketName",
          "kind": "Ref"
        }
      ],
      "part": "Plan7"
    },
    {
      "path": "Plan7/plan7-ecr.yaml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "ECRRegistry",
          "type": "AWS::ECR::Repository"
        },
        {
          "logicalId": "ECRRepositorySSM",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [
        "Plan7EcrRepository"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "Plan7/plan7-ecr.yaml",
          "resource": "ECRRegistry",
          "target": "CountNumber",
          "kind": "Sub"
        }
      ],
      "part": "Plan7"
    },
    {
      "path": "Plan7/plan7-evb.yaml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "EcrEc2CheckInstancesEventRule",
          "type": "AWS::Events::Rule"
        },
        {
          "logicalId": "LambdaPermissionForEventBridge",
          "type": "AWS::Lambda::Permission"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/ECRLambdaFunctionName"
      ],
      "producedSsmParameterNames": [],
      "unresolvedExternalRefs": [
        {
          "file": "Plan7/plan7-evb.yaml",
          "resource": "EcrEc2CheckInstancesEventRule",
          "target": "EcrlambdaFunctionName",
          "kind": "Sub"
        },
        {
          "file": "Plan7/plan7-evb.yaml",
          "resource": "EcrEc2CheckInstancesEventRule",
          "target": "EcrlambdaFunctionName",
          "kind": "Sub"
        },
        {
          "file": "Plan7/plan7-evb.yaml",
          "resource": "LambdaPermissionForEventBridge",
          "target": "EcrlambdaFunctionName",
          "kind": "Ref"
        }
      ],
      "part": "Plan7"
    },
    {
      "path": "Plan8/plan8-alb.yaml",
      "resourceCount": 6,
      "resources": [
        {
          "logicalId": "Plan8ALB",
          "type": "AWS::ElasticLoadBalancingV2::LoadBalancer"
        },
        {
          "logicalId": "Plan8ALBTargetGroup",
          "type": "AWS::ElasticLoadBalancingV2::TargetGroup"
        },
        {
          "logicalId": "Plan8ALBTargetGroupAttachment",
          "type": "AWS::ElasticLoadBalancingV2::TargetGroupAttachment"
        },
        {
          "logicalId": "Plan8ALBListener",
          "type": "AWS::ElasticLoadBalancingV2::Listener"
        },
        {
          "logicalId": "Plan8ALBListenerRule",
          "type": "AWS::ElasticLoadBalancingV2::ListenerRule"
        },
        {
          "logicalId": "Plan8ALBSSMParameter",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [
        "/PublicSubnet1",
        "/PublicSubnet2",
        "/PublicEC2SecurityGroup",
        "/VPC"
      ],
      "producedSsmParameterNames": [
        "/Plan8ALB"
      ],
      "unresolvedExternalRefs": [
        {
          "file": "Plan8/plan8-alb.yaml",
          "resource": "Plan8ALB",
          "target": "PublicSubnet1",
          "kind": "Ref"
        },
        {
          "file": "Plan8/plan8-alb.yaml",
          "resource": "Plan8ALB",
          "target": "PublicSubnet2",
          "kind": "Ref"
        },
        {
          "file": "Plan8/plan8-alb.yaml",
          "resource": "Plan8ALB",
          "target": "ALBSecurityGroup",
          "kind": "Ref"
        },
        {
          "file": "Plan8/plan8-alb.yaml",
          "resource": "Plan8ALBTargetGroup",
          "target": "Vpc",
          "kind": "Ref"
        }
      ],
      "part": "Plan8"
    },
    {
      "path": "test.yaml",
      "resourceCount": 2,
      "resources": [
        {
          "logicalId": "TestWebS3BucketName",
          "type": "AWS::SSM::Parameter"
        },
        {
          "logicalId": "TestErrorSNSTopic",
          "type": "AWS::SSM::Parameter"
        }
      ],
      "consumedSsmParameterDefaults": [],
      "producedSsmParameterNames": [
        "/Test/WebS3BucketName",
        "/Test/ErrorLambdaSNSTopic"
      ],
      "unresolvedExternalRefs": [],
      "part": "Other"
    }
  ],
  "nodes": {
    "resources": [
      {
        "id": "res:common/apse2/CloudWatch/common-cw-metric-alarm.yaml::ApiGwLambdaMetricFilter",
        "file": "common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
        "logicalId": "ApiGwLambdaMetricFilter",
        "type": "AWS::Logs::MetricFilter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/CloudWatch/common-cw-metric-alarm.yaml::ApiGwLambdaLogAlarm",
        "file": "common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
        "logicalId": "ApiGwLambdaLogAlarm",
        "type": "AWS::CloudWatch::Alarm",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/CloudWatch/common-cw-metric-alarm.yaml::EC2CheckInstancesLambdaMetricFilter",
        "file": "common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
        "logicalId": "EC2CheckInstancesLambdaMetricFilter",
        "type": "AWS::Logs::MetricFilter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/CloudWatch/common-cw-metric-alarm.yaml::EC2CheckInstancesLambdaLogAlarm",
        "file": "common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
        "logicalId": "EC2CheckInstancesLambdaLogAlarm",
        "type": "AWS::CloudWatch::Alarm",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/CloudWatch/common-cw-metric-alarm.yaml::Plan7EcrLambdaMetricFilter",
        "file": "common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
        "logicalId": "Plan7EcrLambdaMetricFilter",
        "type": "AWS::Logs::MetricFilter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/CloudWatch/common-cw-metric-alarm.yaml::Plan7EcrLambdaLogAlarm",
        "file": "common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
        "logicalId": "Plan7EcrLambdaLogAlarm",
        "type": "AWS::CloudWatch::Alarm",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/CloudWatch/common-cw-metric-alarm.yaml::S3PutObjectAlarm",
        "file": "common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
        "logicalId": "S3PutObjectAlarm",
        "type": "AWS::CloudWatch::Alarm",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/common-security-group.yml::LambdaSecurityGroup",
        "file": "common/apse2/EC2/common-security-group.yml",
        "logicalId": "LambdaSecurityGroup",
        "type": "AWS::EC2::SecurityGroup",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/common-security-group.yml::SNSEndpointSecurityGroup",
        "file": "common/apse2/EC2/common-security-group.yml",
        "logicalId": "SNSEndpointSecurityGroup",
        "type": "AWS::EC2::SecurityGroup",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/common-security-group.yml::PublicEC2SecurityGroup",
        "file": "common/apse2/EC2/common-security-group.yml",
        "logicalId": "PublicEC2SecurityGroup",
        "type": "AWS::EC2::SecurityGroup",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/common-security-group.yml::PrivateEC2SecurityGroup",
        "file": "common/apse2/EC2/common-security-group.yml",
        "logicalId": "PrivateEC2SecurityGroup",
        "type": "AWS::EC2::SecurityGroup",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/common-security-group.yml::SSMPublicEC2SecurityGroup",
        "file": "common/apse2/EC2/common-security-group.yml",
        "logicalId": "SSMPublicEC2SecurityGroup",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/common-security-group.yml::SSMPrivateSecurityGroup",
        "file": "common/apse2/EC2/common-security-group.yml",
        "logicalId": "SSMPrivateSecurityGroup",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/common-security-group.yml::LambdaSecurityGroupSSM",
        "file": "common/apse2/EC2/common-security-group.yml",
        "logicalId": "LambdaSecurityGroupSSM",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/ec2-keypair.yaml::PublicKeyPair",
        "file": "common/apse2/EC2/ec2-keypair.yaml",
        "logicalId": "PublicKeyPair",
        "type": "AWS::EC2::KeyPair",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/ec2-keypair.yaml::PrivateKeyPair",
        "file": "common/apse2/EC2/ec2-keypair.yaml",
        "logicalId": "PrivateKeyPair",
        "type": "AWS::EC2::KeyPair",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/ec2-keypair.yaml::SSMPublicKey",
        "file": "common/apse2/EC2/ec2-keypair.yaml",
        "logicalId": "SSMPublicKey",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/ec2-keypair.yaml::SSMPrivateKey",
        "file": "common/apse2/EC2/ec2-keypair.yaml",
        "logicalId": "SSMPrivateKey",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/ec2-setting-ssm.yaml::CWAgentConfig",
        "file": "common/apse2/EC2/ec2-setting-ssm.yaml",
        "logicalId": "CWAgentConfig",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/ec2-setting-ssm.yaml::EC2ScriptsSSM",
        "file": "common/apse2/EC2/ec2-setting-ssm.yaml",
        "logicalId": "EC2ScriptsSSM",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/instance-profile.yaml::PublicEC2InstanceProfile",
        "file": "common/apse2/EC2/instance-profile.yaml",
        "logicalId": "PublicEC2InstanceProfile",
        "type": "AWS::IAM::InstanceProfile",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/instance-profile.yaml::PrivateEC2InstanceProfile",
        "file": "common/apse2/EC2/instance-profile.yaml",
        "logicalId": "PrivateEC2InstanceProfile",
        "type": "AWS::IAM::InstanceProfile",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/instance-profile.yaml::SSMPublicEC2Instanceprofile",
        "file": "common/apse2/EC2/instance-profile.yaml",
        "logicalId": "SSMPublicEC2Instanceprofile",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/EC2/instance-profile.yaml::SSMPrivateEC2Instanceprofile",
        "file": "common/apse2/EC2/instance-profile.yaml",
        "logicalId": "SSMPrivateEC2Instanceprofile",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/destination-s3-role.yaml::S3ReplicationRole",
        "file": "common/apse2/IAM/destination-s3-role.yaml",
        "logicalId": "S3ReplicationRole",
        "type": "AWS::IAM::Role",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/destination-s3-role.yaml::S3RoleSSM",
        "file": "common/apse2/IAM/destination-s3-role.yaml",
        "logicalId": "S3RoleSSM",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/lambda-iam-policy.yaml::SendMsgPolicy",
        "file": "common/apse2/IAM/lambda-iam-policy.yaml",
        "logicalId": "SendMsgPolicy",
        "type": "AWS::IAM::Policy",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/lambda-iam-policy.yaml::EC2CheckInstancesPolicy",
        "file": "common/apse2/IAM/lambda-iam-policy.yaml",
        "logicalId": "EC2CheckInstancesPolicy",
        "type": "AWS::IAM::Policy",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/lambda-iam-policy.yaml::LambdaS3AccessPolicy",
        "file": "common/apse2/IAM/lambda-iam-policy.yaml",
        "logicalId": "LambdaS3AccessPolicy",
        "type": "AWS::IAM::Policy",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/lambda-iam-policy.yaml::ECRLambdaPolicy",
        "file": "common/apse2/IAM/lambda-iam-policy.yaml",
        "logicalId": "ECRLambdaPolicy",
        "type": "AWS::IAM::Policy",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/lambda-iam-policy.yaml::LambdaDynamoDBPolicy",
        "file": "common/apse2/IAM/lambda-iam-policy.yaml",
        "logicalId": "LambdaDynamoDBPolicy",
        "type": "AWS::IAM::Policy",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/lambda-iam-role.yaml::BasicLambdaRole",
        "file": "common/apse2/IAM/lambda-iam-role.yaml",
        "logicalId": "BasicLambdaRole",
        "type": "AWS::IAM::Role",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/lambda-iam-role.yaml::ECRLambdaRole",
        "file": "common/apse2/IAM/lambda-iam-role.yaml",
        "logicalId": "ECRLambdaRole",
        "type": "AWS::IAM::Role",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/lambda-iam-role.yaml::DynamoDBLambdaRole",
        "file": "common/apse2/IAM/lambda-iam-role.yaml",
        "logicalId": "DynamoDBLambdaRole",
        "type": "AWS::IAM::Role",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/lambda-iam-role.yaml::ApiGwLambdaRole",
        "file": "common/apse2/IAM/lambda-iam-role.yaml",
        "logicalId": "ApiGwLambdaRole",
        "type": "AWS::IAM::Role",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/lambda-iam-role.yaml::BasicLambdaRoleSSM",
        "file": "common/apse2/IAM/lambda-iam-role.yaml",
        "logicalId": "BasicLambdaRoleSSM",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/lambda-iam-role.yaml::LambdaRoleECRSSM",
        "file": "common/apse2/IAM/lambda-iam-role.yaml",
        "logicalId": "LambdaRoleECRSSM",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/lambda-iam-role.yaml::DynamoDBLambdaRoleSSM",
        "file": "common/apse2/IAM/lambda-iam-role.yaml",
        "logicalId": "DynamoDBLambdaRoleSSM",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/lambda-iam-role.yaml::ApiGwLambdaRoleSSM",
        "file": "common/apse2/IAM/lambda-iam-role.yaml",
        "logicalId": "ApiGwLambdaRoleSSM",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/priv-ec2-iam-role.yaml::PrivateEC2Role",
        "file": "common/apse2/IAM/priv-ec2-iam-role.yaml",
        "logicalId": "PrivateEC2Role",
        "type": "AWS::IAM::Role",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/priv-ec2-iam-role.yaml::SSMPrivateEC2InstanceRole",
        "file": "common/apse2/IAM/priv-ec2-iam-role.yaml",
        "logicalId": "SSMPrivateEC2InstanceRole",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/public-ec2-iam-role.yaml::PublicEC2Role",
        "file": "common/apse2/IAM/public-ec2-iam-role.yaml",
        "logicalId": "PublicEC2Role",
        "type": "AWS::IAM::Role",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/public-ec2-iam-role.yaml::SSMPublicEC2InstanceRole",
        "file": "common/apse2/IAM/public-ec2-iam-role.yaml",
        "logicalId": "SSMPublicEC2InstanceRole",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/s3-iam-role.yaml::S3ReplicationSourceRole",
        "file": "common/apse2/IAM/s3-iam-role.yaml",
        "logicalId": "S3ReplicationSourceRole",
        "type": "AWS::IAM::Role",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/s3-iam-role.yaml::S3ReplicationDestinationRole",
        "file": "common/apse2/IAM/s3-iam-role.yaml",
        "logicalId": "S3ReplicationDestinationRole",
        "type": "AWS::IAM::Role",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/s3-iam-role.yaml::S3RoleSourceSSM",
        "file": "common/apse2/IAM/s3-iam-role.yaml",
        "logicalId": "S3RoleSourceSSM",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/s3-iam-role.yaml::S3RoleDestinationSSM",
        "file": "common/apse2/IAM/s3-iam-role.yaml",
        "logicalId": "S3RoleDestinationSSM",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/source-s3-role.yaml::S3ReplicationRole",
        "file": "common/apse2/IAM/source-s3-role.yaml",
        "logicalId": "S3ReplicationRole",
        "type": "AWS::IAM::Role",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/IAM/source-s3-role.yaml::S3RoleSSM",
        "file": "common/apse2/IAM/source-s3-role.yaml",
        "logicalId": "S3RoleSSM",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/priv-route.yml::PrivateRoutetable",
        "file": "common/apse2/RouteTable/priv-route.yml",
        "logicalId": "PrivateRoutetable",
        "type": "AWS::EC2::RouteTable",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/priv-route.yml::NatGateway",
        "file": "common/apse2/RouteTable/priv-route.yml",
        "logicalId": "NatGateway",
        "type": "AWS::EC2::NatGateway",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/priv-route.yml::PrivateRouteToInternet",
        "file": "common/apse2/RouteTable/priv-route.yml",
        "logicalId": "PrivateRouteToInternet",
        "type": "AWS::EC2::Route",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/priv-route.yml::AssoPrivSub1RT",
        "file": "common/apse2/RouteTable/priv-route.yml",
        "logicalId": "AssoPrivSub1RT",
        "type": "AWS::EC2::SubnetRouteTableAssociation",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/priv-route.yml::AssoPrivSub2RT",
        "file": "common/apse2/RouteTable/priv-route.yml",
        "logicalId": "AssoPrivSub2RT",
        "type": "AWS::EC2::SubnetRouteTableAssociation",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/priv-route.yml::SSMPrivRoutetable",
        "file": "common/apse2/RouteTable/priv-route.yml",
        "logicalId": "SSMPrivRoutetable",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/public-route.yaml::PublicRoutetable",
        "file": "common/apse2/RouteTable/public-route.yaml",
        "logicalId": "PublicRoutetable",
        "type": "AWS::EC2::RouteTable",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/public-route.yaml::InternetGateway",
        "file": "common/apse2/RouteTable/public-route.yaml",
        "logicalId": "InternetGateway",
        "type": "AWS::EC2::InternetGateway",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/public-route.yaml::AttachGateway",
        "file": "common/apse2/RouteTable/public-route.yaml",
        "logicalId": "AttachGateway",
        "type": "AWS::EC2::VPCGatewayAttachment",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/public-route.yaml::PublicRoute",
        "file": "common/apse2/RouteTable/public-route.yaml",
        "logicalId": "PublicRoute",
        "type": "AWS::EC2::Route",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/public-route.yaml::AssoPubSub1RT",
        "file": "common/apse2/RouteTable/public-route.yaml",
        "logicalId": "AssoPubSub1RT",
        "type": "AWS::EC2::SubnetRouteTableAssociation",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/public-route.yaml::AssoPubSub2RT",
        "file": "common/apse2/RouteTable/public-route.yaml",
        "logicalId": "AssoPubSub2RT",
        "type": "AWS::EC2::SubnetRouteTableAssociation",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/public-route.yaml::SSMPublicRoutetable",
        "file": "common/apse2/RouteTable/public-route.yaml",
        "logicalId": "SSMPublicRoutetable",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/vpc-endpoint.yaml::S3Endpoint",
        "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
        "logicalId": "S3Endpoint",
        "type": "AWS::EC2::VPCEndpoint",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/vpc-endpoint.yaml::DynamoDBEndpoint",
        "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
        "logicalId": "DynamoDBEndpoint",
        "type": "AWS::EC2::VPCEndpoint",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/vpc-endpoint.yaml::SNSEndpoint",
        "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
        "logicalId": "SNSEndpoint",
        "type": "AWS::EC2::VPCEndpoint",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/vpc-endpoint.yaml::SSMS3Endpoint",
        "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
        "logicalId": "SSMS3Endpoint",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/vpc-endpoint.yaml::SSMDynamoDBEndpoint",
        "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
        "logicalId": "SSMDynamoDBEndpoint",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/RouteTable/vpc-endpoint.yaml::SSMSNSEndpoint",
        "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
        "logicalId": "SSMSNSEndpoint",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/S3/common-s3-bucket.yaml::CodeS3Bucket",
        "file": "common/apse2/S3/common-s3-bucket.yaml",
        "logicalId": "CodeS3Bucket",
        "type": "AWS::S3::Bucket",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/S3/common-s3-bucket.yaml::CodeBucketPolicy",
        "file": "common/apse2/S3/common-s3-bucket.yaml",
        "logicalId": "CodeBucketPolicy",
        "type": "AWS::S3::BucketPolicy",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/S3/common-s3-bucket.yaml::CodeBucketSSM",
        "file": "common/apse2/S3/common-s3-bucket.yaml",
        "logicalId": "CodeBucketSSM",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/S3/common-s3-code-bucket.yaml::CodeS3Bucket",
        "file": "common/apse2/S3/common-s3-code-bucket.yaml",
        "logicalId": "CodeS3Bucket",
        "type": "AWS::S3::Bucket",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/S3/common-s3-code-bucket.yaml::CodeBucketPolicy",
        "file": "common/apse2/S3/common-s3-code-bucket.yaml",
        "logicalId": "CodeBucketPolicy",
        "type": "AWS::S3::BucketPolicy",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/S3/common-s3-code-bucket.yaml::CodeBucketSSM",
        "file": "common/apse2/S3/common-s3-code-bucket.yaml",
        "logicalId": "CodeBucketSSM",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/S3/common-s3-websites-bucket.yaml::EC2WebsitesS3Bucket",
        "file": "common/apse2/S3/common-s3-websites-bucket.yaml",
        "logicalId": "EC2WebsitesS3Bucket",
        "type": "AWS::S3::Bucket",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/S3/common-s3-websites-bucket.yaml::EC2WebsitesS3BucketPolicy",
        "file": "common/apse2/S3/common-s3-websites-bucket.yaml",
        "logicalId": "EC2WebsitesS3BucketPolicy",
        "type": "AWS::S3::BucketPolicy",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/S3/common-s3-websites-bucket.yaml::EC2WebsitesS3BucketSSM",
        "file": "common/apse2/S3/common-s3-websites-bucket.yaml",
        "logicalId": "EC2WebsitesS3BucketSSM",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::basicLambdaSNSTopic",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "basicLambdaSNSTopic",
        "type": "AWS::SNS::Topic",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::basicLambdaTopicPolicy",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "basicLambdaTopicPolicy",
        "type": "AWS::SNS::TopicPolicy",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::basicLambdaSNSTopicSubscription",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "basicLambdaSNSTopicSubscription",
        "type": "AWS::SNS::Subscription",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::CWInvokeLambdaTopic",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "CWInvokeLambdaTopic",
        "type": "AWS::SNS::Topic",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::ErrorLambdaSNSTopic",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "ErrorLambdaSNSTopic",
        "type": "AWS::SNS::Topic",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::ErrorLambdaTopicPolicy",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "ErrorLambdaTopicPolicy",
        "type": "AWS::SNS::TopicPolicy",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::ErrorSNSTopicSubscription",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "ErrorSNSTopicSubscription",
        "type": "AWS::SNS::Subscription",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::ErrorMailAddressSNSTopic",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "ErrorMailAddressSNSTopic",
        "type": "AWS::SNS::Topic",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::ErrorMailAddressLambdaTopicPolicy",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "ErrorMailAddressLambdaTopicPolicy",
        "type": "AWS::SNS::TopicPolicy",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::ErrorMailAddressSNSTopicSubscription1",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "ErrorMailAddressSNSTopicSubscription1",
        "type": "AWS::SNS::Subscription",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::ErrorMailAddressSNSTopicSubscription2",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "ErrorMailAddressSNSTopicSubscription2",
        "type": "AWS::SNS::Subscription",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::DLMNotificationsSNSTopic",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "DLMNotificationsSNSTopic",
        "type": "AWS::SNS::Topic",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::DLMNotificationsSNSTopicPolicy",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "DLMNotificationsSNSTopicPolicy",
        "type": "AWS::SNS::TopicPolicy",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::DLMNotificationsSNSTopicSubscription",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "DLMNotificationsSNSTopicSubscription",
        "type": "AWS::SNS::Subscription",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::SSMbasicSNSTopic",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "SSMbasicSNSTopic",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::SSMCWInvokeLambdaTopic",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "SSMCWInvokeLambdaTopic",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::SSMErrorLambdaSNSTopic",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "SSMErrorLambdaSNSTopic",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/SNS/common-sns.yaml::SSMErrorMailAddressSNSTopic",
        "file": "common/apse2/SNS/common-sns.yaml",
        "logicalId": "SSMErrorMailAddressSNSTopic",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/common-subnet.yml::PublicSubnet1",
        "file": "common/apse2/Subnet/common-subnet.yml",
        "logicalId": "PublicSubnet1",
        "type": "AWS::EC2::Subnet",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/common-subnet.yml::PublicSubnet2",
        "file": "common/apse2/Subnet/common-subnet.yml",
        "logicalId": "PublicSubnet2",
        "type": "AWS::EC2::Subnet",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/common-subnet.yml::PrivateSubnet1",
        "file": "common/apse2/Subnet/common-subnet.yml",
        "logicalId": "PrivateSubnet1",
        "type": "AWS::EC2::Subnet",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/common-subnet.yml::PrivateSubnet2",
        "file": "common/apse2/Subnet/common-subnet.yml",
        "logicalId": "PrivateSubnet2",
        "type": "AWS::EC2::Subnet",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/common-subnet.yml::SSMPublicSubnet",
        "file": "common/apse2/Subnet/common-subnet.yml",
        "logicalId": "SSMPublicSubnet",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/common-subnet.yml::SSMPublicSubnet2",
        "file": "common/apse2/Subnet/common-subnet.yml",
        "logicalId": "SSMPublicSubnet2",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/common-subnet.yml::SSMPrivateSubnet",
        "file": "common/apse2/Subnet/common-subnet.yml",
        "logicalId": "SSMPrivateSubnet",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/common-subnet.yml::SSMPrivateSubnet2",
        "file": "common/apse2/Subnet/common-subnet.yml",
        "logicalId": "SSMPrivateSubnet2",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/subnet.yml::PublicSubnet1",
        "file": "common/apse2/Subnet/subnet.yml",
        "logicalId": "PublicSubnet1",
        "type": "AWS::EC2::Subnet",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/subnet.yml::PublicSubnet2",
        "file": "common/apse2/Subnet/subnet.yml",
        "logicalId": "PublicSubnet2",
        "type": "AWS::EC2::Subnet",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/subnet.yml::PrivateSubnet1",
        "file": "common/apse2/Subnet/subnet.yml",
        "logicalId": "PrivateSubnet1",
        "type": "AWS::EC2::Subnet",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/subnet.yml::PrivateSubnet2",
        "file": "common/apse2/Subnet/subnet.yml",
        "logicalId": "PrivateSubnet2",
        "type": "AWS::EC2::Subnet",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/subnet.yml::SSMPublicSubnet",
        "file": "common/apse2/Subnet/subnet.yml",
        "logicalId": "SSMPublicSubnet",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/subnet.yml::SSMPublicSubnet2",
        "file": "common/apse2/Subnet/subnet.yml",
        "logicalId": "SSMPublicSubnet2",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/subnet.yml::SSMPrivateSubnet",
        "file": "common/apse2/Subnet/subnet.yml",
        "logicalId": "SSMPrivateSubnet",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/Subnet/subnet.yml::SSMPrivateSubnet2",
        "file": "common/apse2/Subnet/subnet.yml",
        "logicalId": "SSMPrivateSubnet2",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/VPC/common-vpc.yml::Vpc",
        "file": "common/apse2/VPC/common-vpc.yml",
        "logicalId": "Vpc",
        "type": "AWS::EC2::VPC",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/VPC/common-vpc.yml::SSMVpc",
        "file": "common/apse2/VPC/common-vpc.yml",
        "logicalId": "SSMVpc",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/VPC/vpc.yml::Vpc",
        "file": "common/apse2/VPC/vpc.yml",
        "logicalId": "Vpc",
        "type": "AWS::EC2::VPC",
        "part": "Common"
      },
      {
        "id": "res:common/apse2/VPC/vpc.yml::SSMVpc",
        "file": "common/apse2/VPC/vpc.yml",
        "logicalId": "SSMVpc",
        "type": "AWS::SSM::Parameter",
        "part": "Common"
      },
      {
        "id": "res:Plan1/apne1/plan1-apne1-s3.yml::DestinationS3Bucket",
        "file": "Plan1/apne1/plan1-apne1-s3.yml",
        "logicalId": "DestinationS3Bucket",
        "type": "AWS::S3::Bucket",
        "part": "Plan1"
      },
      {
        "id": "res:Plan1/apne1/plan1-apne1-s3.yml::S3BucketPolicy",
        "file": "Plan1/apne1/plan1-apne1-s3.yml",
        "logicalId": "S3BucketPolicy",
        "type": "AWS::S3::BucketPolicy",
        "part": "Plan1"
      },
      {
        "id": "res:Plan1/apse2/plan1-apse2-s3.yaml::lambdaS3Bucket",
        "file": "Plan1/apse2/plan1-apse2-s3.yaml",
        "logicalId": "lambdaS3Bucket",
        "type": "AWS::S3::Bucket",
        "part": "Plan1"
      },
      {
        "id": "res:Plan1/apse2/plan1-apse2-s3.yaml::lambdaS3BucketPolicy",
        "file": "Plan1/apse2/plan1-apse2-s3.yaml",
        "logicalId": "lambdaS3BucketPolicy",
        "type": "AWS::S3::BucketPolicy",
        "part": "Plan1"
      },
      {
        "id": "res:Plan1/apse2/plan1-apse2-s3.yaml::lambdaS3BucketSSM",
        "file": "Plan1/apse2/plan1-apse2-s3.yaml",
        "logicalId": "lambdaS3BucketSSM",
        "type": "AWS::SSM::Parameter",
        "part": "Plan1"
      },
      {
        "id": "res:Plan1/apse2/plan1-lambda.yaml::MyLambdaFunction",
        "file": "Plan1/apse2/plan1-lambda.yaml",
        "logicalId": "MyLambdaFunction",
        "type": "AWS::Lambda::Function",
        "part": "Plan1"
      },
      {
        "id": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambda",
        "file": "Plan2/aws/plan2-apigw.yaml",
        "logicalId": "ApiToLambda",
        "type": "AWS::ApiGateway::RestApi",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambdaResource",
        "file": "Plan2/aws/plan2-apigw.yaml",
        "logicalId": "ApiToLambdaResource",
        "type": "AWS::ApiGateway::Resource",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambdaMethod",
        "file": "Plan2/aws/plan2-apigw.yaml",
        "logicalId": "ApiToLambdaMethod",
        "type": "AWS::ApiGateway::Method",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-apigw.yaml::LambdaApiInvokePermission",
        "file": "Plan2/aws/plan2-apigw.yaml",
        "logicalId": "LambdaApiInvokePermission",
        "type": "AWS::Lambda::Permission",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambdaOptionsMethod",
        "file": "Plan2/aws/plan2-apigw.yaml",
        "logicalId": "ApiToLambdaOptionsMethod",
        "type": "AWS::ApiGateway::Method",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-apigw.yaml::ApiDeployment",
        "file": "Plan2/aws/plan2-apigw.yaml",
        "logicalId": "ApiDeployment",
        "type": "AWS::ApiGateway::Deployment",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-apse2-s3.yaml::WebS3Bucket",
        "file": "Plan2/aws/plan2-apse2-s3.yaml",
        "logicalId": "WebS3Bucket",
        "type": "AWS::S3::Bucket",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-apse2-s3.yaml::WebS3BucketPolicy",
        "file": "Plan2/aws/plan2-apse2-s3.yaml",
        "logicalId": "WebS3BucketPolicy",
        "type": "AWS::S3::BucketPolicy",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-apse2-s3.yaml::WebS3BucketSSM",
        "file": "Plan2/aws/plan2-apse2-s3.yaml",
        "logicalId": "WebS3BucketSSM",
        "type": "AWS::SSM::Parameter",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-lambda-data-modification.yaml::ApiGwLambdaFunction",
        "file": "Plan2/aws/plan2-lambda-data-modification.yaml",
        "logicalId": "ApiGwLambdaFunction",
        "type": "AWS::Lambda::Function",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-lambda-data-modification.yaml::SSMLambdaFunctionName",
        "file": "Plan2/aws/plan2-lambda-data-modification.yaml",
        "logicalId": "SSMLambdaFunctionName",
        "type": "AWS::SSM::Parameter",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-lambda-data-modification.yaml::SSMLambdaFunctionArn",
        "file": "Plan2/aws/plan2-lambda-data-modification.yaml",
        "logicalId": "SSMLambdaFunctionArn",
        "type": "AWS::SSM::Parameter",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-lambda-input-into-dynamodb.yaml::ApiGwLambdaFunction",
        "file": "Plan2/aws/plan2-lambda-input-into-dynamodb.yaml",
        "logicalId": "ApiGwLambdaFunction",
        "type": "AWS::Lambda::Function",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-lambda-input-into-dynamodb.yaml::SSMLambdaFunctionName",
        "file": "Plan2/aws/plan2-lambda-input-into-dynamodb.yaml",
        "logicalId": "SSMLambdaFunctionName",
        "type": "AWS::SSM::Parameter",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-lambda-input-into-dynamodb.yaml::SSMLambdaFunctionArn",
        "file": "Plan2/aws/plan2-lambda-input-into-dynamodb.yaml",
        "logicalId": "SSMLambdaFunctionArn",
        "type": "AWS::SSM::Parameter",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-lambda-login-data.yaml::ApiGwLambdaFunction",
        "file": "Plan2/aws/plan2-lambda-login-data.yaml",
        "logicalId": "ApiGwLambdaFunction",
        "type": "AWS::Lambda::Function",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-lambda-login-data.yaml::SSMLambdaFunctionName",
        "file": "Plan2/aws/plan2-lambda-login-data.yaml",
        "logicalId": "SSMLambdaFunctionName",
        "type": "AWS::SSM::Parameter",
        "part": "Plan2"
      },
      {
        "id": "res:Plan2/aws/plan2-lambda-login-data.yaml::SSMLambdaFunctionArn",
        "file": "Plan2/aws/plan2-lambda-login-data.yaml",
        "logicalId": "SSMLambdaFunctionArn",
        "type": "AWS::SSM::Parameter",
        "part": "Plan2"
      },
      {
        "id": "res:Plan3/plan3-lambda.yaml::ErrorLambdaFunction",
        "file": "Plan3/plan3-lambda.yaml",
        "logicalId": "ErrorLambdaFunction",
        "type": "AWS::Lambda::Function",
        "part": "Plan3"
      },
      {
        "id": "res:Plan3/plan3-lambda.yaml::ErrorLambdaFunctionTrigger",
        "file": "Plan3/plan3-lambda.yaml",
        "logicalId": "ErrorLambdaFunctionTrigger",
        "type": "AWS::Lambda::Permission",
        "part": "Plan3"
      },
      {
        "id": "res:Plan3/plan3-lambda.yaml::SSMLambdaFunctionArn",
        "file": "Plan3/plan3-lambda.yaml",
        "logicalId": "SSMLambdaFunctionArn",
        "type": "AWS::SSM::Parameter",
        "part": "Plan3"
      },
      {
        "id": "res:Plan4/plan4-dynamodb-table.yaml::Plan4DynamoDBTable",
        "file": "Plan4/plan4-dynamodb-table.yaml",
        "logicalId": "Plan4DynamoDBTable",
        "type": "AWS::DynamoDB::Table",
        "part": "Plan4"
      },
      {
        "id": "res:Plan4/plan4-private-ec2-instance.yaml::PrivateInstance",
        "file": "Plan4/plan4-private-ec2-instance.yaml",
        "logicalId": "PrivateInstance",
        "type": "AWS::EC2::Instance",
        "part": "Plan4"
      },
      {
        "id": "res:Plan4/plan4-private-ec2-instance.yaml::SSMPrivateEC2Instance",
        "file": "Plan4/plan4-private-ec2-instance.yaml",
        "logicalId": "SSMPrivateEC2Instance",
        "type": "AWS::SSM::Parameter",
        "part": "Plan4"
      },
      {
        "id": "res:Plan4/plan4-public-ec2-instance.yaml::PublicInstance",
        "file": "Plan4/plan4-public-ec2-instance.yaml",
        "logicalId": "PublicInstance",
        "type": "AWS::EC2::Instance",
        "part": "Plan4"
      },
      {
        "id": "res:Plan4/plan4-public-ec2-instance.yaml::PublicEBSVolume",
        "file": "Plan4/plan4-public-ec2-instance.yaml",
        "logicalId": "PublicEBSVolume",
        "type": "AWS::EC2::Volume",
        "part": "Plan4"
      },
      {
        "id": "res:Plan4/plan4-public-ec2-instance.yaml::SSMPublicEC2Instance",
        "file": "Plan4/plan4-public-ec2-instance.yaml",
        "logicalId": "SSMPublicEC2Instance",
        "type": "AWS::SSM::Parameter",
        "part": "Plan4"
      },
      {
        "id": "res:Plan5/plan5-evb.yaml::EC2CheckInstancesEventRule",
        "file": "Plan5/plan5-evb.yaml",
        "logicalId": "EC2CheckInstancesEventRule",
        "type": "AWS::Events::Rule",
        "part": "Plan5"
      },
      {
        "id": "res:Plan5/plan5-evb.yaml::LambdaPermissionForEventBridge",
        "file": "Plan5/plan5-evb.yaml",
        "logicalId": "LambdaPermissionForEventBridge",
        "type": "AWS::Lambda::Permission",
        "part": "Plan5"
      },
      {
        "id": "res:Plan5/plan5-lambda.yaml::EC2CheckInstancesLambdaFunction",
        "file": "Plan5/plan5-lambda.yaml",
        "logicalId": "EC2CheckInstancesLambdaFunction",
        "type": "AWS::Lambda::Function",
        "part": "Plan5"
      },
      {
        "id": "res:Plan5/plan5-lambda.yaml::SSMEC2CheckInstancesLambdaFunctionArn",
        "file": "Plan5/plan5-lambda.yaml",
        "logicalId": "SSMEC2CheckInstancesLambdaFunctionArn",
        "type": "AWS::SSM::Parameter",
        "part": "Plan5"
      },
      {
        "id": "res:Plan6/old/plan6-ec2-fleet-instances.yaml::MyEC2Fleet",
        "file": "Plan6/old/plan6-ec2-fleet-instances.yaml",
        "logicalId": "MyEC2Fleet",
        "type": "AWS::EC2::EC2Fleet",
        "part": "Plan6"
      },
      {
        "id": "res:Plan6/old/plan6-ec2-fleet-instances.yaml::PublicLaunchTemplate",
        "file": "Plan6/old/plan6-ec2-fleet-instances.yaml",
        "logicalId": "PublicLaunchTemplate",
        "type": "AWS::EC2::LaunchTemplate",
        "part": "Plan6"
      },
      {
        "id": "res:Plan6/plan6-ec2-templates.yaml::PublicEC2LaunchTemplate",
        "file": "Plan6/plan6-ec2-templates.yaml",
        "logicalId": "PublicEC2LaunchTemplate",
        "type": "AWS::EC2::LaunchTemplate",
        "part": "Plan6"
      },
      {
        "id": "res:Plan6/plan6-ec2-templates.yaml::PublicEC2AutoScalingGroup",
        "file": "Plan6/plan6-ec2-templates.yaml",
        "logicalId": "PublicEC2AutoScalingGroup",
        "type": "AWS::AutoScaling::AutoScalingGroup",
        "part": "Plan6"
      },
      {
        "id": "res:Plan6/plan6-eventbridge.yaml::DLMEventRule",
        "file": "Plan6/plan6-eventbridge.yaml",
        "logicalId": "DLMEventRule",
        "type": "AWS::Events::Rule",
        "part": "Plan6"
      },
      {
        "id": "res:Plan6/plan6-lifecycle-manager.yaml::PublicEC2AMILifecyclePolicy",
        "file": "Plan6/plan6-lifecycle-manager.yaml",
        "logicalId": "PublicEC2AMILifecyclePolicy",
        "type": "AWS::DLM::LifecyclePolicy",
        "part": "Plan6"
      },
      {
        "id": "res:Plan6/plan6-lifecycle-manager.yaml::PublicEBSVolumeLifecyclePolicy",
        "file": "Plan6/plan6-lifecycle-manager.yaml",
        "logicalId": "PublicEBSVolumeLifecyclePolicy",
        "type": "AWS::DLM::LifecyclePolicy",
        "part": "Plan6"
      },
      {
        "id": "res:Plan7/plan7-ecr-lambda.yaml::ECRLambdaFunction",
        "file": "Plan7/plan7-ecr-lambda.yaml",
        "logicalId": "ECRLambdaFunction",
        "type": "AWS::Lambda::Function",
        "part": "Plan7"
      },
      {
        "id": "res:Plan7/plan7-ecr-lambda.yaml::SSMECRLambdaFunctionArn",
        "file": "Plan7/plan7-ecr-lambda.yaml",
        "logicalId": "SSMECRLambdaFunctionArn",
        "type": "AWS::SSM::Parameter",
        "part": "Plan7"
      },
      {
        "id": "res:Plan7/plan7-ecr.yaml::ECRRegistry",
        "file": "Plan7/plan7-ecr.yaml",
        "logicalId": "ECRRegistry",
        "type": "AWS::ECR::Repository",
        "part": "Plan7"
      },
      {
        "id": "res:Plan7/plan7-ecr.yaml::ECRRepositorySSM",
        "file": "Plan7/plan7-ecr.yaml",
        "logicalId": "ECRRepositorySSM",
        "type": "AWS::SSM::Parameter",
        "part": "Plan7"
      },
      {
        "id": "res:Plan7/plan7-evb.yaml::EcrEc2CheckInstancesEventRule",
        "file": "Plan7/plan7-evb.yaml",
        "logicalId": "EcrEc2CheckInstancesEventRule",
        "type": "AWS::Events::Rule",
        "part": "Plan7"
      },
      {
        "id": "res:Plan7/plan7-evb.yaml::LambdaPermissionForEventBridge",
        "file": "Plan7/plan7-evb.yaml",
        "logicalId": "LambdaPermissionForEventBridge",
        "type": "AWS::Lambda::Permission",
        "part": "Plan7"
      },
      {
        "id": "res:Plan8/plan8-alb.yaml::Plan8ALB",
        "file": "Plan8/plan8-alb.yaml",
        "logicalId": "Plan8ALB",
        "type": "AWS::ElasticLoadBalancingV2::LoadBalancer",
        "part": "Plan8"
      },
      {
        "id": "res:Plan8/plan8-alb.yaml::Plan8ALBTargetGroup",
        "file": "Plan8/plan8-alb.yaml",
        "logicalId": "Plan8ALBTargetGroup",
        "type": "AWS::ElasticLoadBalancingV2::TargetGroup",
        "part": "Plan8"
      },
      {
        "id": "res:Plan8/plan8-alb.yaml::Plan8ALBTargetGroupAttachment",
        "file": "Plan8/plan8-alb.yaml",
        "logicalId": "Plan8ALBTargetGroupAttachment",
        "type": "AWS::ElasticLoadBalancingV2::TargetGroupAttachment",
        "part": "Plan8"
      },
      {
        "id": "res:Plan8/plan8-alb.yaml::Plan8ALBListener",
        "file": "Plan8/plan8-alb.yaml",
        "logicalId": "Plan8ALBListener",
        "type": "AWS::ElasticLoadBalancingV2::Listener",
        "part": "Plan8"
      },
      {
        "id": "res:Plan8/plan8-alb.yaml::Plan8ALBListenerRule",
        "file": "Plan8/plan8-alb.yaml",
        "logicalId": "Plan8ALBListenerRule",
        "type": "AWS::ElasticLoadBalancingV2::ListenerRule",
        "part": "Plan8"
      },
      {
        "id": "res:Plan8/plan8-alb.yaml::Plan8ALBSSMParameter",
        "file": "Plan8/plan8-alb.yaml",
        "logicalId": "Plan8ALBSSMParameter",
        "type": "AWS::SSM::Parameter",
        "part": "Plan8"
      },
      {
        "id": "res:test.yaml::TestWebS3BucketName",
        "file": "test.yaml",
        "logicalId": "TestWebS3BucketName",
        "type": "AWS::SSM::Parameter",
        "part": "Other"
      },
      {
        "id": "res:test.yaml::TestErrorSNSTopic",
        "file": "test.yaml",
        "logicalId": "TestErrorSNSTopic",
        "type": "AWS::SSM::Parameter",
        "part": "Other"
      }
    ],
    "templates": [
      {
        "id": "file:.github/workflows/main.yml",
        "file": ".github/workflows/main.yml",
        "part": "Other"
      },
      {
        "id": "file:common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
        "file": "common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/EC2/common-security-group.yml",
        "file": "common/apse2/EC2/common-security-group.yml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/EC2/ec2-keypair.yaml",
        "file": "common/apse2/EC2/ec2-keypair.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/EC2/ec2-setting-ssm.yaml",
        "file": "common/apse2/EC2/ec2-setting-ssm.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/EC2/instance-profile.yaml",
        "file": "common/apse2/EC2/instance-profile.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/IAM/destination-s3-role.yaml",
        "file": "common/apse2/IAM/destination-s3-role.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/IAM/lambda-iam-policy.yaml",
        "file": "common/apse2/IAM/lambda-iam-policy.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/IAM/lambda-iam-role.yaml",
        "file": "common/apse2/IAM/lambda-iam-role.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/IAM/priv-ec2-iam-role.yaml",
        "file": "common/apse2/IAM/priv-ec2-iam-role.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/IAM/public-ec2-iam-role.yaml",
        "file": "common/apse2/IAM/public-ec2-iam-role.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/IAM/s3-iam-role.yaml",
        "file": "common/apse2/IAM/s3-iam-role.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/IAM/source-s3-role.yaml",
        "file": "common/apse2/IAM/source-s3-role.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/RouteTable/priv-route.yml",
        "file": "common/apse2/RouteTable/priv-route.yml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/RouteTable/public-route.yaml",
        "file": "common/apse2/RouteTable/public-route.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/RouteTable/vpc-endpoint.yaml",
        "file": "common/apse2/RouteTable/vpc-endpoint.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/S3/common-s3-bucket.yaml",
        "file": "common/apse2/S3/common-s3-bucket.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/S3/common-s3-code-bucket.yaml",
        "file": "common/apse2/S3/common-s3-code-bucket.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/S3/common-s3-websites-bucket.yaml",
        "file": "common/apse2/S3/common-s3-websites-bucket.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/SNS/common-sns.yaml",
        "file": "common/apse2/SNS/common-sns.yaml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/Subnet/common-subnet.yml",
        "file": "common/apse2/Subnet/common-subnet.yml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/Subnet/subnet.yml",
        "file": "common/apse2/Subnet/subnet.yml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/VPC/common-vpc.yml",
        "file": "common/apse2/VPC/common-vpc.yml",
        "part": "Common"
      },
      {
        "id": "file:common/apse2/VPC/vpc.yml",
        "file": "common/apse2/VPC/vpc.yml",
        "part": "Common"
      },
      {
        "id": "file:Plan1/apne1/plan1-apne1-s3.yml",
        "file": "Plan1/apne1/plan1-apne1-s3.yml",
        "part": "Plan1"
      },
      {
        "id": "file:Plan1/apse2/plan1-apse2-s3.yaml",
        "file": "Plan1/apse2/plan1-apse2-s3.yaml",
        "part": "Plan1"
      },
      {
        "id": "file:Plan1/apse2/plan1-lambda.yaml",
        "file": "Plan1/apse2/plan1-lambda.yaml",
        "part": "Plan1"
      },
      {
        "id": "file:Plan2/aws/plan2-apigw.yaml",
        "file": "Plan2/aws/plan2-apigw.yaml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/aws/plan2-apse2-s3.yaml",
        "file": "Plan2/aws/plan2-apse2-s3.yaml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/aws/plan2-lambda-data-modification.yaml",
        "file": "Plan2/aws/plan2-lambda-data-modification.yaml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/aws/plan2-lambda-input-into-dynamodb.yaml",
        "file": "Plan2/aws/plan2-lambda-input-into-dynamodb.yaml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/aws/plan2-lambda-login-data.yaml",
        "file": "Plan2/aws/plan2-lambda-login-data.yaml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/old/zip_package/create-html/vendor/bref/bref/serverless.yml",
        "file": "Plan2/old/zip_package/create-html/vendor/bref/bref/serverless.yml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/old/zip_package/create-html/vendor/bref/bref/template/function/serverless.yml",
        "file": "Plan2/old/zip_package/create-html/vendor/bref/bref/template/function/serverless.yml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/old/zip_package/create-html/vendor/bref/bref/template/http/serverless.yml",
        "file": "Plan2/old/zip_package/create-html/vendor/bref/bref/template/http/serverless.yml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/old/zip_package/create-html/vendor/bref/bref/template/symfony/serverless.yml",
        "file": "Plan2/old/zip_package/create-html/vendor/bref/bref/template/symfony/serverless.yml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/old/zip_package/create-html/vendor/riverline/multipart-parser/.github/workflows/php.yml",
        "file": "Plan2/old/zip_package/create-html/vendor/riverline/multipart-parser/.github/workflows/php.yml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/old/zip_package/login/vendor/bref/bref/serverless.yml",
        "file": "Plan2/old/zip_package/login/vendor/bref/bref/serverless.yml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/old/zip_package/login/vendor/bref/bref/template/function/serverless.yml",
        "file": "Plan2/old/zip_package/login/vendor/bref/bref/template/function/serverless.yml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/old/zip_package/login/vendor/bref/bref/template/http/serverless.yml",
        "file": "Plan2/old/zip_package/login/vendor/bref/bref/template/http/serverless.yml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/old/zip_package/login/vendor/bref/bref/template/symfony/serverless.yml",
        "file": "Plan2/old/zip_package/login/vendor/bref/bref/template/symfony/serverless.yml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/old/zip_package/login/vendor/riverline/multipart-parser/.github/workflows/php.yml",
        "file": "Plan2/old/zip_package/login/vendor/riverline/multipart-parser/.github/workflows/php.yml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/zip_package/login/vendor/bref/bref/serverless.yml",
        "file": "Plan2/zip_package/login/vendor/bref/bref/serverless.yml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/zip_package/login/vendor/bref/bref/template/function/serverless.yml",
        "file": "Plan2/zip_package/login/vendor/bref/bref/template/function/serverless.yml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/zip_package/login/vendor/bref/bref/template/http/serverless.yml",
        "file": "Plan2/zip_package/login/vendor/bref/bref/template/http/serverless.yml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/zip_package/login/vendor/bref/bref/template/symfony/serverless.yml",
        "file": "Plan2/zip_package/login/vendor/bref/bref/template/symfony/serverless.yml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan2/zip_package/login/vendor/riverline/multipart-parser/.github/workflows/php.yml",
        "file": "Plan2/zip_package/login/vendor/riverline/multipart-parser/.github/workflows/php.yml",
        "part": "Plan2"
      },
      {
        "id": "file:Plan3/plan3-lambda.yaml",
        "file": "Plan3/plan3-lambda.yaml",
        "part": "Plan3"
      },
      {
        "id": "file:Plan4/plan4-dynamodb-table.yaml",
        "file": "Plan4/plan4-dynamodb-table.yaml",
        "part": "Plan4"
      },
      {
        "id": "file:Plan4/plan4-private-ec2-instance.yaml",
        "file": "Plan4/plan4-private-ec2-instance.yaml",
        "part": "Plan4"
      },
      {
        "id": "file:Plan4/plan4-public-ec2-instance.yaml",
        "file": "Plan4/plan4-public-ec2-instance.yaml",
        "part": "Plan4"
      },
      {
        "id": "file:Plan5/plan5-evb.yaml",
        "file": "Plan5/plan5-evb.yaml",
        "part": "Plan5"
      },
      {
        "id": "file:Plan5/plan5-lambda.yaml",
        "file": "Plan5/plan5-lambda.yaml",
        "part": "Plan5"
      },
      {
        "id": "file:Plan6/old/plan6-ec2-fleet-instances.yaml",
        "file": "Plan6/old/plan6-ec2-fleet-instances.yaml",
        "part": "Plan6"
      },
      {
        "id": "file:Plan6/plan6-ec2-templates.yaml",
        "file": "Plan6/plan6-ec2-templates.yaml",
        "part": "Plan6"
      },
      {
        "id": "file:Plan6/plan6-eventbridge.yaml",
        "file": "Plan6/plan6-eventbridge.yaml",
        "part": "Plan6"
      },
      {
        "id": "file:Plan6/plan6-lifecycle-manager.yaml",
        "file": "Plan6/plan6-lifecycle-manager.yaml",
        "part": "Plan6"
      },
      {
        "id": "file:Plan7/plan7-ecr-lambda.yaml",
        "file": "Plan7/plan7-ecr-lambda.yaml",
        "part": "Plan7"
      },
      {
        "id": "file:Plan7/plan7-ecr.yaml",
        "file": "Plan7/plan7-ecr.yaml",
        "part": "Plan7"
      },
      {
        "id": "file:Plan7/plan7-evb.yaml",
        "file": "Plan7/plan7-evb.yaml",
        "part": "Plan7"
      },
      {
        "id": "file:Plan8/plan8-alb.yaml",
        "file": "Plan8/plan8-alb.yaml",
        "part": "Plan8"
      },
      {
        "id": "file:test.yaml",
        "file": "test.yaml",
        "part": "Other"
      }
    ]
  },
  "edges": [
    {
      "from": "res:common/apse2/EC2/common-security-group.yml::SNSEndpointSecurityGroup",
      "to": "res:common/apse2/EC2/common-security-group.yml::LambdaSecurityGroup",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/EC2/common-security-group.yml::SSMPublicEC2SecurityGroup",
      "to": "res:common/apse2/EC2/common-security-group.yml::PublicEC2SecurityGroup",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/EC2/common-security-group.yml::SSMPrivateSecurityGroup",
      "to": "res:common/apse2/EC2/common-security-group.yml::PrivateEC2SecurityGroup",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/EC2/common-security-group.yml::LambdaSecurityGroupSSM",
      "to": "res:common/apse2/EC2/common-security-group.yml::LambdaSecurityGroup",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/EC2/ec2-keypair.yaml::SSMPublicKey",
      "to": "res:common/apse2/EC2/ec2-keypair.yaml::PublicKeyPair",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/EC2/ec2-keypair.yaml::SSMPrivateKey",
      "to": "res:common/apse2/EC2/ec2-keypair.yaml::PrivateKeyPair",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/EC2/instance-profile.yaml::SSMPublicEC2Instanceprofile",
      "to": "res:common/apse2/EC2/instance-profile.yaml::PublicEC2InstanceProfile",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/EC2/instance-profile.yaml::SSMPrivateEC2Instanceprofile",
      "to": "res:common/apse2/EC2/instance-profile.yaml::PrivateEC2InstanceProfile",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/IAM/destination-s3-role.yaml::S3RoleSSM",
      "to": "res:common/apse2/IAM/destination-s3-role.yaml::S3ReplicationRole",
      "kind": "GetAtt"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-role.yaml::BasicLambdaRoleSSM",
      "to": "res:common/apse2/IAM/lambda-iam-role.yaml::BasicLambdaRole",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-role.yaml::LambdaRoleECRSSM",
      "to": "res:common/apse2/IAM/lambda-iam-role.yaml::ECRLambdaRole",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-role.yaml::DynamoDBLambdaRoleSSM",
      "to": "res:common/apse2/IAM/lambda-iam-role.yaml::DynamoDBLambdaRole",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-role.yaml::ApiGwLambdaRoleSSM",
      "to": "res:common/apse2/IAM/lambda-iam-role.yaml::ApiGwLambdaRole",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/IAM/priv-ec2-iam-role.yaml::SSMPrivateEC2InstanceRole",
      "to": "res:common/apse2/IAM/priv-ec2-iam-role.yaml::PrivateEC2Role",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/IAM/public-ec2-iam-role.yaml::SSMPublicEC2InstanceRole",
      "to": "res:common/apse2/IAM/public-ec2-iam-role.yaml::PublicEC2Role",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/IAM/s3-iam-role.yaml::S3RoleSourceSSM",
      "to": "res:common/apse2/IAM/s3-iam-role.yaml::S3ReplicationSourceRole",
      "kind": "GetAtt"
    },
    {
      "from": "res:common/apse2/IAM/s3-iam-role.yaml::S3RoleDestinationSSM",
      "to": "res:common/apse2/IAM/s3-iam-role.yaml::S3ReplicationDestinationRole",
      "kind": "GetAtt"
    },
    {
      "from": "res:common/apse2/IAM/source-s3-role.yaml::S3RoleSSM",
      "to": "res:common/apse2/IAM/source-s3-role.yaml::S3ReplicationRole",
      "kind": "GetAtt"
    },
    {
      "from": "res:common/apse2/RouteTable/priv-route.yml::PrivateRouteToInternet",
      "to": "res:common/apse2/RouteTable/priv-route.yml::PrivateRoutetable",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/RouteTable/priv-route.yml::PrivateRouteToInternet",
      "to": "res:common/apse2/RouteTable/priv-route.yml::NatGateway",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/RouteTable/priv-route.yml::AssoPrivSub1RT",
      "to": "res:common/apse2/RouteTable/priv-route.yml::PrivateRoutetable",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/RouteTable/priv-route.yml::AssoPrivSub2RT",
      "to": "res:common/apse2/RouteTable/priv-route.yml::PrivateRoutetable",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/RouteTable/priv-route.yml::SSMPrivRoutetable",
      "to": "res:common/apse2/RouteTable/priv-route.yml::PrivateRoutetable",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/RouteTable/public-route.yaml::AttachGateway",
      "to": "res:common/apse2/RouteTable/public-route.yaml::InternetGateway",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/RouteTable/public-route.yaml::PublicRoute",
      "to": "res:common/apse2/RouteTable/public-route.yaml::PublicRoutetable",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/RouteTable/public-route.yaml::PublicRoute",
      "to": "res:common/apse2/RouteTable/public-route.yaml::InternetGateway",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/RouteTable/public-route.yaml::AssoPubSub1RT",
      "to": "res:common/apse2/RouteTable/public-route.yaml::PublicRoutetable",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/RouteTable/public-route.yaml::AssoPubSub2RT",
      "to": "res:common/apse2/RouteTable/public-route.yaml::PublicRoutetable",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/RouteTable/public-route.yaml::SSMPublicRoutetable",
      "to": "res:common/apse2/RouteTable/public-route.yaml::PublicRoutetable",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/RouteTable/vpc-endpoint.yaml::SSMS3Endpoint",
      "to": "res:common/apse2/RouteTable/vpc-endpoint.yaml::S3Endpoint",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/RouteTable/vpc-endpoint.yaml::SSMDynamoDBEndpoint",
      "to": "res:common/apse2/RouteTable/vpc-endpoint.yaml::DynamoDBEndpoint",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/RouteTable/vpc-endpoint.yaml::SSMSNSEndpoint",
      "to": "res:common/apse2/RouteTable/vpc-endpoint.yaml::SNSEndpoint",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/S3/common-s3-bucket.yaml::CodeBucketPolicy",
      "to": "res:common/apse2/S3/common-s3-bucket.yaml::CodeS3Bucket",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/S3/common-s3-bucket.yaml::CodeBucketPolicy",
      "to": "res:common/apse2/S3/common-s3-bucket.yaml::CodeS3Bucket",
      "kind": "Sub"
    },
    {
      "from": "res:common/apse2/S3/common-s3-bucket.yaml::CodeBucketSSM",
      "to": "res:common/apse2/S3/common-s3-bucket.yaml::CodeS3Bucket",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/S3/common-s3-code-bucket.yaml::CodeBucketPolicy",
      "to": "res:common/apse2/S3/common-s3-code-bucket.yaml::CodeS3Bucket",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/S3/common-s3-code-bucket.yaml::CodeBucketPolicy",
      "to": "res:common/apse2/S3/common-s3-code-bucket.yaml::CodeS3Bucket",
      "kind": "Sub"
    },
    {
      "from": "res:common/apse2/S3/common-s3-code-bucket.yaml::CodeBucketSSM",
      "to": "res:common/apse2/S3/common-s3-code-bucket.yaml::CodeS3Bucket",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/S3/common-s3-websites-bucket.yaml::EC2WebsitesS3BucketPolicy",
      "to": "res:common/apse2/S3/common-s3-websites-bucket.yaml::EC2WebsitesS3Bucket",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/S3/common-s3-websites-bucket.yaml::EC2WebsitesS3BucketPolicy",
      "to": "res:common/apse2/S3/common-s3-websites-bucket.yaml::EC2WebsitesS3Bucket",
      "kind": "Sub"
    },
    {
      "from": "res:common/apse2/S3/common-s3-websites-bucket.yaml::EC2WebsitesS3BucketSSM",
      "to": "res:common/apse2/S3/common-s3-websites-bucket.yaml::EC2WebsitesS3Bucket",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::basicLambdaTopicPolicy",
      "to": "res:common/apse2/SNS/common-sns.yaml::basicLambdaSNSTopic",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::basicLambdaSNSTopicSubscription",
      "to": "res:common/apse2/SNS/common-sns.yaml::basicLambdaSNSTopic",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::ErrorLambdaTopicPolicy",
      "to": "res:common/apse2/SNS/common-sns.yaml::ErrorLambdaSNSTopic",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::ErrorSNSTopicSubscription",
      "to": "res:common/apse2/SNS/common-sns.yaml::ErrorLambdaSNSTopic",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::ErrorMailAddressLambdaTopicPolicy",
      "to": "res:common/apse2/SNS/common-sns.yaml::ErrorMailAddressSNSTopic",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::ErrorMailAddressSNSTopicSubscription1",
      "to": "res:common/apse2/SNS/common-sns.yaml::ErrorMailAddressSNSTopic",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::ErrorMailAddressSNSTopicSubscription2",
      "to": "res:common/apse2/SNS/common-sns.yaml::ErrorMailAddressSNSTopic",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::DLMNotificationsSNSTopicPolicy",
      "to": "res:common/apse2/SNS/common-sns.yaml::DLMNotificationsSNSTopic",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::DLMNotificationsSNSTopicSubscription",
      "to": "res:common/apse2/SNS/common-sns.yaml::DLMNotificationsSNSTopic",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::SSMbasicSNSTopic",
      "to": "res:common/apse2/SNS/common-sns.yaml::basicLambdaSNSTopic",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::SSMCWInvokeLambdaTopic",
      "to": "res:common/apse2/SNS/common-sns.yaml::CWInvokeLambdaTopic",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::SSMErrorLambdaSNSTopic",
      "to": "res:common/apse2/SNS/common-sns.yaml::ErrorLambdaSNSTopic",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::SSMErrorMailAddressSNSTopic",
      "to": "res:common/apse2/SNS/common-sns.yaml::ErrorMailAddressSNSTopic",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/Subnet/common-subnet.yml::SSMPublicSubnet",
      "to": "res:common/apse2/Subnet/common-subnet.yml::PublicSubnet1",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/Subnet/common-subnet.yml::SSMPublicSubnet2",
      "to": "res:common/apse2/Subnet/common-subnet.yml::PublicSubnet2",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/Subnet/common-subnet.yml::SSMPrivateSubnet",
      "to": "res:common/apse2/Subnet/common-subnet.yml::PrivateSubnet1",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/Subnet/common-subnet.yml::SSMPrivateSubnet2",
      "to": "res:common/apse2/Subnet/common-subnet.yml::PrivateSubnet2",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/Subnet/subnet.yml::SSMPublicSubnet",
      "to": "res:common/apse2/Subnet/subnet.yml::PublicSubnet1",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/Subnet/subnet.yml::SSMPublicSubnet2",
      "to": "res:common/apse2/Subnet/subnet.yml::PublicSubnet2",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/Subnet/subnet.yml::SSMPrivateSubnet",
      "to": "res:common/apse2/Subnet/subnet.yml::PrivateSubnet1",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/Subnet/subnet.yml::SSMPrivateSubnet2",
      "to": "res:common/apse2/Subnet/subnet.yml::PrivateSubnet2",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/VPC/common-vpc.yml::SSMVpc",
      "to": "res:common/apse2/VPC/common-vpc.yml::Vpc",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/VPC/vpc.yml::SSMVpc",
      "to": "res:common/apse2/VPC/vpc.yml::Vpc",
      "kind": "Ref"
    },
    {
      "from": "res:Plan1/apne1/plan1-apne1-s3.yml::S3BucketPolicy",
      "to": "res:Plan1/apne1/plan1-apne1-s3.yml::DestinationS3Bucket",
      "kind": "Ref"
    },
    {
      "from": "res:Plan1/apne1/plan1-apne1-s3.yml::S3BucketPolicy",
      "to": "res:Plan1/apne1/plan1-apne1-s3.yml::DestinationS3Bucket",
      "kind": "Sub"
    },
    {
      "from": "res:Plan1/apse2/plan1-apse2-s3.yaml::lambdaS3BucketPolicy",
      "to": "res:Plan1/apse2/plan1-apse2-s3.yaml::lambdaS3Bucket",
      "kind": "Ref"
    },
    {
      "from": "res:Plan1/apse2/plan1-apse2-s3.yaml::lambdaS3BucketPolicy",
      "to": "res:Plan1/apse2/plan1-apse2-s3.yaml::lambdaS3Bucket",
      "kind": "Sub"
    },
    {
      "from": "res:Plan1/apse2/plan1-apse2-s3.yaml::lambdaS3BucketSSM",
      "to": "res:Plan1/apse2/plan1-apse2-s3.yaml::lambdaS3Bucket",
      "kind": "Ref"
    },
    {
      "from": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambdaResource",
      "to": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambda",
      "kind": "Ref"
    },
    {
      "from": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambdaResource",
      "to": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambda",
      "kind": "GetAtt"
    },
    {
      "from": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambdaMethod",
      "to": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambda",
      "kind": "Ref"
    },
    {
      "from": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambdaMethod",
      "to": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambdaResource",
      "kind": "Ref"
    },
    {
      "from": "res:Plan2/aws/plan2-apigw.yaml::LambdaApiInvokePermission",
      "to": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambda",
      "kind": "Sub"
    },
    {
      "from": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambdaOptionsMethod",
      "to": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambda",
      "kind": "Ref"
    },
    {
      "from": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambdaOptionsMethod",
      "to": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambdaResource",
      "kind": "Ref"
    },
    {
      "from": "res:Plan2/aws/plan2-apigw.yaml::ApiDeployment",
      "to": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambdaMethod",
      "kind": "DependsOn"
    },
    {
      "from": "res:Plan2/aws/plan2-apigw.yaml::ApiDeployment",
      "to": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambdaOptionsMethod",
      "kind": "DependsOn"
    },
    {
      "from": "res:Plan2/aws/plan2-apigw.yaml::ApiDeployment",
      "to": "res:Plan2/aws/plan2-apigw.yaml::ApiToLambda",
      "kind": "Ref"
    },
    {
      "from": "res:Plan2/aws/plan2-apse2-s3.yaml::WebS3BucketPolicy",
      "to": "res:Plan2/aws/plan2-apse2-s3.yaml::WebS3Bucket",
      "kind": "Ref"
    },
    {
      "from": "res:Plan2/aws/plan2-apse2-s3.yaml::WebS3BucketPolicy",
      "to": "res:Plan2/aws/plan2-apse2-s3.yaml::WebS3Bucket",
      "kind": "Sub"
    },
    {
      "from": "res:Plan2/aws/plan2-apse2-s3.yaml::WebS3BucketSSM",
      "to": "res:Plan2/aws/plan2-apse2-s3.yaml::WebS3Bucket",
      "kind": "Ref"
    },
    {
      "from": "res:Plan2/aws/plan2-lambda-data-modification.yaml::SSMLambdaFunctionName",
      "to": "res:Plan2/aws/plan2-lambda-data-modification.yaml::ApiGwLambdaFunction",
      "kind": "Ref"
    },
    {
      "from": "res:Plan2/aws/plan2-lambda-data-modification.yaml::SSMLambdaFunctionArn",
      "to": "res:Plan2/aws/plan2-lambda-data-modification.yaml::ApiGwLambdaFunction",
      "kind": "GetAtt"
    },
    {
      "from": "res:Plan2/aws/plan2-lambda-input-into-dynamodb.yaml::SSMLambdaFunctionName",
      "to": "res:Plan2/aws/plan2-lambda-input-into-dynamodb.yaml::ApiGwLambdaFunction",
      "kind": "Ref"
    },
    {
      "from": "res:Plan2/aws/plan2-lambda-input-into-dynamodb.yaml::SSMLambdaFunctionArn",
      "to": "res:Plan2/aws/plan2-lambda-input-into-dynamodb.yaml::ApiGwLambdaFunction",
      "kind": "GetAtt"
    },
    {
      "from": "res:Plan2/aws/plan2-lambda-login-data.yaml::SSMLambdaFunctionName",
      "to": "res:Plan2/aws/plan2-lambda-login-data.yaml::ApiGwLambdaFunction",
      "kind": "Ref"
    },
    {
      "from": "res:Plan2/aws/plan2-lambda-login-data.yaml::SSMLambdaFunctionArn",
      "to": "res:Plan2/aws/plan2-lambda-login-data.yaml::ApiGwLambdaFunction",
      "kind": "GetAtt"
    },
    {
      "from": "res:Plan3/plan3-lambda.yaml::ErrorLambdaFunctionTrigger",
      "to": "res:Plan3/plan3-lambda.yaml::ErrorLambdaFunction",
      "kind": "Ref"
    },
    {
      "from": "res:Plan3/plan3-lambda.yaml::SSMLambdaFunctionArn",
      "to": "res:Plan3/plan3-lambda.yaml::ErrorLambdaFunction",
      "kind": "Ref"
    },
    {
      "from": "res:Plan4/plan4-private-ec2-instance.yaml::SSMPrivateEC2Instance",
      "to": "res:Plan4/plan4-private-ec2-instance.yaml::PrivateInstance",
      "kind": "Ref"
    },
    {
      "from": "res:Plan4/plan4-public-ec2-instance.yaml::SSMPublicEC2Instance",
      "to": "res:Plan4/plan4-public-ec2-instance.yaml::PublicInstance",
      "kind": "Ref"
    },
    {
      "from": "res:Plan5/plan5-evb.yaml::LambdaPermissionForEventBridge",
      "to": "res:Plan5/plan5-evb.yaml::EC2CheckInstancesEventRule",
      "kind": "GetAtt"
    },
    {
      "from": "res:Plan5/plan5-lambda.yaml::SSMEC2CheckInstancesLambdaFunctionArn",
      "to": "res:Plan5/plan5-lambda.yaml::EC2CheckInstancesLambdaFunction",
      "kind": "Ref"
    },
    {
      "from": "res:Plan6/old/plan6-ec2-fleet-instances.yaml::MyEC2Fleet",
      "to": "res:Plan6/old/plan6-ec2-fleet-instances.yaml::PublicLaunchTemplate",
      "kind": "Ref"
    },
    {
      "from": "res:Plan6/old/plan6-ec2-fleet-instances.yaml::MyEC2Fleet",
      "to": "res:Plan6/old/plan6-ec2-fleet-instances.yaml::PublicLaunchTemplate",
      "kind": "GetAtt"
    },
    {
      "from": "res:Plan6/plan6-ec2-templates.yaml::PublicEC2AutoScalingGroup",
      "to": "res:Plan6/plan6-ec2-templates.yaml::PublicEC2LaunchTemplate",
      "kind": "Ref"
    },
    {
      "from": "res:Plan6/plan6-ec2-templates.yaml::PublicEC2AutoScalingGroup",
      "to": "res:Plan6/plan6-ec2-templates.yaml::PublicEC2LaunchTemplate",
      "kind": "GetAtt"
    },
    {
      "from": "res:Plan7/plan7-ecr-lambda.yaml::SSMECRLambdaFunctionArn",
      "to": "res:Plan7/plan7-ecr-lambda.yaml::ECRLambdaFunction",
      "kind": "Ref"
    },
    {
      "from": "res:Plan7/plan7-ecr.yaml::ECRRepositorySSM",
      "to": "res:Plan7/plan7-ecr.yaml::ECRRegistry",
      "kind": "Ref"
    },
    {
      "from": "res:Plan7/plan7-evb.yaml::LambdaPermissionForEventBridge",
      "to": "res:Plan7/plan7-evb.yaml::EcrEc2CheckInstancesEventRule",
      "kind": "GetAtt"
    },
    {
      "from": "res:Plan8/plan8-alb.yaml::Plan8ALBTargetGroupAttachment",
      "to": "res:Plan8/plan8-alb.yaml::Plan8ALBTargetGroup",
      "kind": "Ref"
    },
    {
      "from": "res:Plan8/plan8-alb.yaml::Plan8ALBListener",
      "to": "res:Plan8/plan8-alb.yaml::Plan8ALB",
      "kind": "Ref"
    },
    {
      "from": "res:Plan8/plan8-alb.yaml::Plan8ALBListener",
      "to": "res:Plan8/plan8-alb.yaml::Plan8ALBTargetGroup",
      "kind": "Ref"
    },
    {
      "from": "res:Plan8/plan8-alb.yaml::Plan8ALBListenerRule",
      "to": "res:Plan8/plan8-alb.yaml::Plan8ALBListener",
      "kind": "DependsOn"
    },
    {
      "from": "res:Plan8/plan8-alb.yaml::Plan8ALBListenerRule",
      "to": "res:Plan8/plan8-alb.yaml::Plan8ALBListener",
      "kind": "Ref"
    },
    {
      "from": "res:Plan8/plan8-alb.yaml::Plan8ALBListenerRule",
      "to": "res:Plan8/plan8-alb.yaml::Plan8ALBTargetGroup",
      "kind": "Ref"
    },
    {
      "from": "res:Plan8/plan8-alb.yaml::Plan8ALBSSMParameter",
      "to": "res:Plan8/plan8-alb.yaml::Plan8ALB",
      "kind": "Ref"
    },
    {
      "from": "res:common/apse2/EC2/instance-profile.yaml::PublicEC2InstanceProfile",
      "to": "res:common/apse2/IAM/public-ec2-iam-role.yaml::PublicEC2Role",
      "kind": "RefCrossFileUnique",
      "detail": "PublicEC2Role"
    },
    {
      "from": "res:common/apse2/EC2/instance-profile.yaml::PrivateEC2InstanceProfile",
      "to": "res:common/apse2/IAM/priv-ec2-iam-role.yaml::PrivateEC2Role",
      "kind": "RefCrossFileUnique",
      "detail": "PrivateEC2Role"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-policy.yaml::SendMsgPolicy",
      "to": "res:common/apse2/IAM/lambda-iam-role.yaml::BasicLambdaRole",
      "kind": "RefCrossFileUnique",
      "detail": "BasicLambdaRole"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-policy.yaml::SendMsgPolicy",
      "to": "res:common/apse2/IAM/lambda-iam-role.yaml::DynamoDBLambdaRole",
      "kind": "RefCrossFileUnique",
      "detail": "DynamoDBLambdaRole"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-policy.yaml::SendMsgPolicy",
      "to": "res:common/apse2/IAM/lambda-iam-role.yaml::ApiGwLambdaRole",
      "kind": "RefCrossFileUnique",
      "detail": "ApiGwLambdaRole"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-policy.yaml::EC2CheckInstancesPolicy",
      "to": "res:common/apse2/IAM/lambda-iam-role.yaml::BasicLambdaRole",
      "kind": "RefCrossFileUnique",
      "detail": "BasicLambdaRole"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-policy.yaml::LambdaS3AccessPolicy",
      "to": "res:common/apse2/IAM/lambda-iam-role.yaml::BasicLambdaRole",
      "kind": "RefCrossFileUnique",
      "detail": "BasicLambdaRole"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-policy.yaml::LambdaS3AccessPolicy",
      "to": "res:common/apse2/IAM/lambda-iam-role.yaml::DynamoDBLambdaRole",
      "kind": "RefCrossFileUnique",
      "detail": "DynamoDBLambdaRole"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-policy.yaml::LambdaDynamoDBPolicy",
      "to": "res:common/apse2/IAM/lambda-iam-role.yaml::ApiGwLambdaRole",
      "kind": "RefCrossFileUnique",
      "detail": "ApiGwLambdaRole"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-policy.yaml::LambdaDynamoDBPolicy",
      "to": "res:common/apse2/IAM/lambda-iam-role.yaml::DynamoDBLambdaRole",
      "kind": "RefCrossFileUnique",
      "detail": "DynamoDBLambdaRole"
    },
    {
      "from": "res:common/apse2/RouteTable/vpc-endpoint.yaml::S3Endpoint",
      "to": "res:common/apse2/RouteTable/priv-route.yml::PrivateRoutetable",
      "kind": "RefCrossFileUnique",
      "detail": "PrivateRoutetable"
    },
    {
      "from": "res:common/apse2/RouteTable/vpc-endpoint.yaml::DynamoDBEndpoint",
      "to": "res:common/apse2/RouteTable/priv-route.yml::PrivateRoutetable",
      "kind": "RefCrossFileUnique",
      "detail": "PrivateRoutetable"
    },
    {
      "from": "res:Plan4/plan4-private-ec2-instance.yaml::PrivateInstance",
      "to": "res:common/apse2/EC2/ec2-keypair.yaml::PrivateKeyPair",
      "kind": "RefCrossFileUnique",
      "detail": "PrivateKeyPair"
    },
    {
      "from": "res:Plan4/plan4-private-ec2-instance.yaml::PrivateInstance",
      "to": "res:common/apse2/EC2/instance-profile.yaml::PrivateEC2InstanceProfile",
      "kind": "RefCrossFileUnique",
      "detail": "PrivateEC2InstanceProfile"
    },
    {
      "from": "res:Plan4/plan4-private-ec2-instance.yaml::PrivateInstance",
      "to": "res:common/apse2/EC2/ec2-setting-ssm.yaml::EC2ScriptsSSM",
      "kind": "RefCrossFileUnique",
      "detail": "EC2ScriptsSSM"
    },
    {
      "from": "res:Plan4/plan4-private-ec2-instance.yaml::PrivateInstance",
      "to": "res:common/apse2/EC2/ec2-setting-ssm.yaml::CWAgentConfig",
      "kind": "RefCrossFileUnique",
      "detail": "CWAgentConfig"
    },
    {
      "from": "res:Plan4/plan4-public-ec2-instance.yaml::PublicInstance",
      "to": "res:common/apse2/EC2/ec2-keypair.yaml::PublicKeyPair",
      "kind": "RefCrossFileUnique",
      "detail": "PublicKeyPair"
    },
    {
      "from": "res:Plan4/plan4-public-ec2-instance.yaml::PublicInstance",
      "to": "res:common/apse2/EC2/instance-profile.yaml::PublicEC2InstanceProfile",
      "kind": "RefCrossFileUnique",
      "detail": "PublicEC2InstanceProfile"
    },
    {
      "from": "res:Plan4/plan4-public-ec2-instance.yaml::PublicInstance",
      "to": "res:common/apse2/EC2/ec2-setting-ssm.yaml::EC2ScriptsSSM",
      "kind": "RefCrossFileUnique",
      "detail": "EC2ScriptsSSM"
    },
    {
      "from": "res:Plan4/plan4-public-ec2-instance.yaml::PublicInstance",
      "to": "res:common/apse2/EC2/ec2-setting-ssm.yaml::CWAgentConfig",
      "kind": "RefCrossFileUnique",
      "detail": "CWAgentConfig"
    },
    {
      "from": "res:Plan6/old/plan6-ec2-fleet-instances.yaml::PublicLaunchTemplate",
      "to": "res:common/apse2/EC2/common-security-group.yml::PublicEC2SecurityGroup",
      "kind": "RefCrossFileUnique",
      "detail": "PublicEC2SecurityGroup"
    },
    {
      "from": "res:Plan6/old/plan6-ec2-fleet-instances.yaml::PublicLaunchTemplate",
      "to": "res:common/apse2/EC2/ec2-keypair.yaml::PublicKeyPair",
      "kind": "RefCrossFileUnique",
      "detail": "PublicKeyPair"
    },
    {
      "from": "res:Plan6/plan6-ec2-templates.yaml::PublicEC2LaunchTemplate",
      "to": "res:common/apse2/EC2/ec2-keypair.yaml::PublicKeyPair",
      "kind": "RefCrossFileUnique",
      "detail": "PublicKeyPair"
    },
    {
      "from": "res:Plan6/plan6-ec2-templates.yaml::PublicEC2LaunchTemplate",
      "to": "res:common/apse2/EC2/instance-profile.yaml::PublicEC2InstanceProfile",
      "kind": "RefCrossFileUnique",
      "detail": "PublicEC2InstanceProfile"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::SSMErrorLambdaSNSTopic",
      "to": "file:common/apse2/CloudWatch/common-cw-metric-alarm.yaml",
      "kind": "SSMParameterLink",
      "detail": "/ErrorLambdaSNSTopic"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-role.yaml::BasicLambdaRoleSSM",
      "to": "file:common/apse2/IAM/lambda-iam-policy.yaml",
      "kind": "SSMParameterLink",
      "detail": "BasicLambdaRole"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-role.yaml::LambdaRoleECRSSM",
      "to": "file:common/apse2/IAM/lambda-iam-policy.yaml",
      "kind": "SSMParameterLink",
      "detail": "LambdaECRExecutionRole"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-role.yaml::DynamoDBLambdaRoleSSM",
      "to": "file:common/apse2/IAM/lambda-iam-policy.yaml",
      "kind": "SSMParameterLink",
      "detail": "DynamoDBLambdaRole"
    },
    {
      "from": "res:common/apse2/IAM/lambda-iam-role.yaml::ApiGwLambdaRoleSSM",
      "to": "file:common/apse2/IAM/lambda-iam-policy.yaml",
      "kind": "SSMParameterLink",
      "detail": "ApiGwLambdaRole"
    },
    {
      "from": "res:Plan3/plan3-lambda.yaml::SSMLambdaFunctionArn",
      "to": "file:common/apse2/SNS/common-sns.yaml",
      "kind": "SSMParameterLink",
      "detail": "/ErrorLambdaFunctionName"
    },
    {
      "from": "res:Plan2/aws/plan2-lambda-data-modification.yaml::SSMLambdaFunctionName",
      "to": "file:Plan2/aws/plan2-apigw.yaml",
      "kind": "SSMParameterLink",
      "detail": "/ApiGWLambdaFunctionName"
    },
    {
      "from": "res:Plan2/aws/plan2-lambda-input-into-dynamodb.yaml::SSMLambdaFunctionName",
      "to": "file:Plan2/aws/plan2-apigw.yaml",
      "kind": "SSMParameterLink",
      "detail": "/ApiGWLambdaFunctionName"
    },
    {
      "from": "res:Plan2/aws/plan2-lambda-login-data.yaml::SSMLambdaFunctionName",
      "to": "file:Plan2/aws/plan2-apigw.yaml",
      "kind": "SSMParameterLink",
      "detail": "/ApiGWLambdaFunctionName"
    },
    {
      "from": "res:Plan2/aws/plan2-lambda-data-modification.yaml::SSMLambdaFunctionArn",
      "to": "file:Plan2/aws/plan2-apigw.yaml",
      "kind": "SSMParameterLink",
      "detail": "/ApiGWLambdaFunctionArn"
    },
    {
      "from": "res:Plan2/aws/plan2-lambda-input-into-dynamodb.yaml::SSMLambdaFunctionArn",
      "to": "file:Plan2/aws/plan2-apigw.yaml",
      "kind": "SSMParameterLink",
      "detail": "/ApiGWLambdaFunctionArn"
    },
    {
      "from": "res:Plan2/aws/plan2-lambda-login-data.yaml::SSMLambdaFunctionArn",
      "to": "file:Plan2/aws/plan2-apigw.yaml",
      "kind": "SSMParameterLink",
      "detail": "/ApiGWLambdaFunctionArn"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::SSMbasicSNSTopic",
      "to": "file:Plan2/aws/plan2-lambda-data-modification.yaml",
      "kind": "SSMParameterLink",
      "detail": "/basicSNSTopic"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::SSMbasicSNSTopic",
      "to": "file:Plan2/aws/plan2-lambda-input-into-dynamodb.yaml",
      "kind": "SSMParameterLink",
      "detail": "/basicSNSTopic"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::SSMbasicSNSTopic",
      "to": "file:Plan2/aws/plan2-lambda-login-data.yaml",
      "kind": "SSMParameterLink",
      "detail": "/basicSNSTopic"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::SSMErrorLambdaSNSTopic",
      "to": "file:Plan3/plan3-lambda.yaml",
      "kind": "SSMParameterLink",
      "detail": "/ErrorLambdaSNSTopic"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::SSMErrorMailAddressSNSTopic",
      "to": "file:Plan3/plan3-lambda.yaml",
      "kind": "SSMParameterLink",
      "detail": "/ErrorMailAddressSNSTopic"
    },
    {
      "from": "res:Plan5/plan5-lambda.yaml::SSMEC2CheckInstancesLambdaFunctionArn",
      "to": "file:Plan5/plan5-evb.yaml",
      "kind": "SSMParameterLink",
      "detail": "/EC2CheckInstancesLambdaFunctionName"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::SSMbasicSNSTopic",
      "to": "file:Plan5/plan5-lambda.yaml",
      "kind": "SSMParameterLink",
      "detail": "/basicSNSTopic"
    },
    {
      "from": "res:common/apse2/SNS/common-sns.yaml::SSMbasicSNSTopic",
      "to": "file:Plan7/plan7-ecr-lambda.yaml",
      "kind": "SSMParameterLink",
      "detail": "/basicSNSTopic"
    },
    {
      "from": "res:Plan7/plan7-ecr-lambda.yaml::SSMECRLambdaFunctionArn",
      "to": "file:Plan7/plan7-evb.yaml",
      "kind": "SSMParameterLink",
      "detail": "/ECRLambdaFunctionName"
    }
  ],
  "cycles": [],
  "parseErrors": []
};
