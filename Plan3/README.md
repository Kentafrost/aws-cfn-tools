# CloudWatch Logs-Based Alerting Workflow

This setup enables automated alerting and notifications based on logs ingested into CloudWatch Logs. The workflow ensures critical log events trigger alarms and notifications via AWS services.

## Workflow
Other Lambda function ⇒ Cloud Watch Logs ⇒ Metric Filter ⇒ CloudWatch Alarm(*1) ⇒ SNS 
⇒ Lambda function for Alarm ⇒ SNS topic to send e-mail notifications.

※1: please check common\apse2\common-lambda-cw-subsription-filt.yaml

## Overview

This workflow follows these steps:

1. **CloudWatch Logs**: Collects and stores application or infrastructure logs.
2. **Cloud Watch Metric Filter**: Identifies specific log patterns and extracts metrics.
3. **CloudWatch Alarm**: Monitors metric thresholds and triggers alerts.
4. **SNS (Simple Notification Service)**: Distributes alerts via notifications.
5. **Lambda Function**: Executes custom logic upon receiving alerts.
6. **SNS Topic**: Sends email notifications based on the triggered alarm.

## Workflow Steps

### 1. CloudWatch Logs
 Logs from various AWS services or applications are stored in CloudWatch Logs. The logs may  contain errors, warnings, or other noteworthy events.

### 2. Metric Filter
 CloudWatch Metric Filters parse incoming logs and extract key metrics from log data in log group.

### 3. CloudWatch log alarm
 If metrics data are detected over its threshold, then publish SNS topic to invoke Lambda function 
 for error, and send e-mail through another SNS topic(Basic topic)

