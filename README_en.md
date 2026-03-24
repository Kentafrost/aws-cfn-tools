# AWS CloudFormation Tools & Templates 🚀

This repository is a project aimed at learning and implementing infrastructure automation using AWS CloudFormation.

## 📋 Table of Contents
| Section | Link |
|---|---|
| Project Overview | [Project Overview](#project-overview) |
| Folder Structure | [Folder Structure](#folder-structure) |
| YAML Quick Matrix (All Checked) | [YAML Quick Matrix (All Checked)](#yaml-quick-matrix-all-checked) |
| Usage | [Usage](#usage) |
| Prerequisites | [Prerequisites](#prerequisites) |

## 🎯 Project Overview

This section is intentionally kept at summary level because project priorities can change over time.

### **Core Direction (Living Scope)**
| Direction | Details |
|---|---|
| CloudFormation-first workflow | Build and evolve AWS infrastructure through reusable YAML templates |
| IaC operations | Keep deployments repeatable, reviewable, and easier to maintain |
| Service integration practice | Combine core AWS services (for example EC2, S3, Lambda, API Gateway, CloudWatch, DynamoDB, ECR) across plan-based scenarios |

### **How to Track Latest Focus**
| What to Check | Reference |
|---|---|
| Plan-specific goals and implementation details | Each plan folder's README.md |
| Ongoing ideas and future changes | memo_to_add.md |
| Template-level implementation state | [doc/yaml-quick-matrix.html](doc/yaml-quick-matrix.html) / [doc/display-yaml.html](doc/display-yaml.html) |

## 📁 Folder Structure

This repository structure can evolve as plans and experiments change.

Current entry points (stable references):
| Entry Point | Description |
|---|---|
| common/ | Shared templates (for example regional baseline resources) |
| PlanX/ | Scenario-based templates and plan-specific docs |
| doc/ | Visualization and analysis tools/pages |
| doc/scripts/ | Generators for matrix and relation outputs |
| memo_to_add.md | Notes and future ideas |

For up-to-date template inventory and relationships, use:
| Purpose | Link |
|---|---|
| Template inventory, counts, and distribution | [doc/yaml-quick-matrix.html](doc/yaml-quick-matrix.html) |
| Template relationships and detailed view | [doc/display-yaml.html](doc/display-yaml.html) |


This README keeps summary-level information only, while detailed template-level tables are handled in the separate HTML page.

## ✅ YAML Quick Matrix (All Checked)

You can check implementation status, service distribution, and counts per template from the pages below.

| Item | Link |
|---|---|
| YAML Quick Matrix | [doc/yaml-quick-matrix.html](doc/yaml-quick-matrix.html) |
| YAML Detailed View | [doc/display-yaml.html](doc/display-yaml.html) |


## 🚀 Usage

### Basic Deployment
| Target | Command |
|---|---|
| Deploy common resources | `aws cloudformation create-stack --stack-name common-resources --template-body file://common/apse2/[resource].yaml` |
| Deploy individual plans | `aws cloudformation create-stack --stack-name plan1-resources --template-body file://Plan1/[template].yaml` |

### Prerequisites
| Item | Details |
|---|---|
| [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) | Configured with appropriate credentials |
| [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) | For serverless templates |
| [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) | For Python automation scripts |
| IAM permissions | Create and manage EC2, S3, IAM, CloudWatch resources |

## 📊 Project Statistics
| Metric | Value |
|---|---|
| YAML and resource counts | Generated dynamically in [doc/yaml-quick-matrix.html](doc/yaml-quick-matrix.html) |
| Service distribution | Generated dynamically in [doc/yaml-quick-matrix.html](doc/yaml-quick-matrix.html) |
| Regions | ap-southeast-2 (main, Sydney Region), ap-northeast-1 (replication, Tokyo Region) |
| Automation Scripts | Python (boto3), PowerShell |

---

**Note:** Each plan folder contains detailed README.md files for specific implementation procedures and configuration details.
