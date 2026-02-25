# AWS CloudFormation Tools & Templates 🚀

このリポジトリは、AWS CloudFormationを使用したインフラストラクチャ自動化の学習と実装を目的としたプロジェクトです。

## 📋 目次
- [プロジェクト概要](#プロジェクト概要)
- [フォルダ構造](#フォルダ構造)
- [各プランの詳細](#各プランの詳細)
- [共通リソース](#共通リソース)
- [使用方法](#使用方法)
- [前提条件](#前提条件)

## 🎯 プロジェクト概要

### **学習中の技術**
- **AWS CloudFormation:** YAMLテンプレートを使用したリソースプロビジョニングとインフラセットアップの自動化
- **Infrastructure as Code (IaC):** 信頼性があり再現可能なクラウドデプロイメントのベストプラクティスの実装
- **AWS サービス:** EC2、S3、Lambda、その他の基盤サービスを使用した効果的なアプリケーションの構築と管理

### **現在の開発目標**
- EC2インスタンスへのアプリケーションインストールとSSM Managersによる自動更新の実装
- 全EC2インスタンスでのRUNコマンド実行機能
- S3バケット内のHTMLを使用したログインシステム（Lambda、PHP、API Gateway、DynamoDB連携）

## 📁 フォルダ構造

```
aws-cfn-tools/
├── Plan1/          # VPC、S3エンドポイント、Lambda、S3レプリケーション
├── Plan2/          # HTMLデータ処理とAWS統合
├── Plan3/          # CloudWatchログベースのアラートワークフロー
├── Plan4/          # EC2インスタンスデプロイメント（Windows Server + IIS）
├── Plan5/          # EC2インスタンス自動管理とEventBridge連携
├── Plan6/          # AMIライフサイクル自動化とDLM
├── Plan7/          # ECR + Lambdaコンテナー統合
├── Plan8/          # 追加のプロジェクト
├── common/         # 共通リソーステンプレート
│   └── apse2/      # ap-southeast-2リージョン用テンプレート
├── memo_to_add.md  # プロジェクトメモと将来の機能
├── test.yaml       # SSMパラメーターテスト用テンプレート
└── yaml_files_list.csv  # 全YAMLファイルのカタログ
```

## 🔧 各プランの詳細

### Plan1: VPCエンドポイントとS3統合
- **目的:** Lambda関数からS3バケットへのVPCエンドポイント経由アクセス
- **機能:** S3バケットのリージョン間レプリケーション（東京 ⇔ シドニー）
- **リソース:** VPC、ルートテーブル、VPCエンドポイント、サブネット、セキュリティグループ、Lambda、S3

### Plan2: HTMLデータ処理
- **目的:** HTMLデータの管理とAWSサービス統合
- **ファイル:** html_input_data.csv、設定ファイル

### Plan3: CloudWatchログアラートシステム
- **ワークフロー:** 
  ```
  Lambda → CloudWatch Logs → Metric Filter → CloudWatch Alarm → SNS → Lambda for Alarm → Email通知
  ```
- **機能:** ログパターンの監視、メトリクス抽出、自動アラート、メール通知

### Plan4: EC2インスタンス管理
- **プラットフォーム:** Windows Server + IIS
- **機能:** CloudWatchエージェント、SSM統合、Webサイトアクセス可能
- **テンプレート:**
  - `plan4-public-ec2-instance.yaml` - パブリックインスタンス
  - `plan4-private-ec2-instance.yaml` - プライベートインスタンス
  - `plan4-dynamodb-table.yaml` - DynamoDBテーブル

### Plan5: EC2自動管理システム
- **機能:** EC2インスタンスのステータスチェックと自動停止
- **ワークフロー:** Lambda実行 → インスタンス停止 → SNS通知 → エラーハンドリング
- **監視:** CloudWatch Logs、メトリクス、アラーム

### Plan6: AMIライフサイクル管理
- **機能:** AMI作成とEBSスナップショットの自動化
- **スケジューリング:** 定期的なバックアップ作成
- **通知:** EventBridgeルールとSNS連携
- **スクリプト:** `create_ami.py` - AMI作成自動化

### Plan7: ECRとLambdaコンテナー
- **機能:** ECRリポジトリとLambdaコンテナーの統合
- **ファイル:**
  - `plan7-ecr.yaml` - ECRリポジトリ
  - `plan7-ecr-lambda.yaml` - Lambda統合
  - `Dockerfile/` - コンテナー定義

## 🔄 共通リソース (common/apse2/)

### EC2関連
- **ec2-keypair.yaml** - EC2キーペア設定
- **ec2-setting-ssm.yaml** - SSM設定
- **instance-profile.yaml** - インスタンスプロファイル
- **common-security-group.yml** - 共通セキュリティグループ

### IAM関連
- **lambda-iam-role.yaml** - Lambda実行ロール
- **public-ec2-iam-role.yaml** - パブリックEC2ロール
- **priv-ec2-iam-role.yaml** - プライベートEC2ロール
- **destination-s3-role.yaml** - S3転送先ロール

### S3関連
- **common-s3-bucket.yaml** - 基本S3バケット
- **common-s3-websites-bucket.yaml** - ウェブサイト用S3バケット
- **common-s3-code-bucket.yaml** - コード保管用S3バケット

### その他のサービス
- **VPC/** - VPC設定テンプレート
- **Subnet/** - サブネット設定
- **RouteTable/** - ルートテーブル設定
- **SNS/** - 通知サービス設定
- **CloudWatch/** - モニタリング設定

## 🚀 使用方法

### 基本デプロイメント
```bash
# 共通リソースのデプロイ
aws cloudformation create-stack --stack-name common-resources --template-body file://common/apse2/[resource].yaml

# 個別プランのデプロイ
aws cloudformation create-stack --stack-name plan1-resources --template-body file://Plan1/[template].yaml
```

### 前提条件
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) - 適切な認証情報で設定済み
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) - サーバーレステンプレート用
- [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) - Python自動化スクリプト用
- 適切なIAMアクセス許可 - EC2、S3、IAM、CloudWatchリソースの作成・管理権限

## 📊 プロジェクト統計
- **YAMLテンプレート:** 30+ ファイル
- **対象AWSサービス:** EC2, S3, Lambda, CloudWatch, SNS, IAM, DynamoDB, ECR
- **リージョン:** ap-southeast-2 (メイン), ap-northeast-1 (レプリケーション)
- **自動化スクリプト:** Python (boto3), PowerShell

---

**注記:** 各プランフォルダには詳細なREADME.mdファイルが含まれており、具体的な実装手順と設定詳細を参照できます。
