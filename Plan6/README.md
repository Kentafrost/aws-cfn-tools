# EC2 AMI Lifecycle Automation

This project provides scripts and templates to automate the creation and backup of Amazon EC2 AMIs and snapshots, helping you manage your instance images and recover from accidental deletions.

---

## **Workflow Overview**

1. **Lifecycle Management**
    - Automate the creation of AMIs and EBS snapshots for EC2 instances.
    - Schedule regular backups to ensure you always have recent images available.

    - Notification of DLM events using EventBridge rule and SNS.
    　SNS resources are created in a yaml file in a folder, "common\apse2"

2.  **Future plan**
    **Bin Setup**
    - Enable backup and recovery services to protect against accidental deletion of AMIs or snapshots.
    - Store deleted AMIs/snapshots in a "bin" or backup location for easy restoration.

---

## **Prerequisites**

- Python 3.x
- [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) (`pip install boto3`)
- AWS CLI configured with appropriate credentials and permissions

---