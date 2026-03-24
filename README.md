# AWS CloudFormation Tools & Templates 🚀

このリポジトリは、AWS CloudFormationを使用したインフラストラクチャ自動化の学習と実装を目的としたプロジェクトです。

## 📋 目次
| セクション | リンク |
|---|---|
| プロジェクト概要 | [プロジェクト概要](#プロジェクト概要) |
| フォルダ構造 | [フォルダ構造](#フォルダ構造) |
| YAML クイックマトリクス（全件確認） | [YAML クイックマトリクス（全件確認）](#yaml-クイックマトリクス全件確認) |
| 使用方法 | [使用方法](#使用方法) |
| 前提条件 | [前提条件](#前提条件) |

## 🎯 プロジェクト概要

このセクションは、プロジェクトの優先度が変化しうるため、意図的に要約レベルで記載しています。

### **中核方針（可変スコープ）**
| 方針 | 内容 |
|---|---|
| CloudFormation ファーストの運用 | 再利用可能な YAML テンプレートを軸に AWS インフラを構築・拡張 |
| IaC オペレーション | デプロイを再現可能・レビュー可能にし、保守性を高める |
| サービス統合の実践 | EC2、S3、Lambda、API Gateway、CloudWatch、DynamoDB、ECR などをプラン単位で組み合わせる |

### **最新フォーカスの追跡方法**
| 確認対象 | 参照先 |
|---|---|
| プラン固有の目的・実装詳細 | 各プランフォルダ内の README.md |
| 進行中メモや今後の変更案 | memo_to_add.md |
| テンプレート単位の実装状況 | [doc/yaml-quick-matrix.html](doc/yaml-quick-matrix.html) / [doc/display-yaml.html](doc/display-yaml.html) |

## 📁 フォルダ構造

このリポジトリ構成は、プランや検証内容の進行に応じて変化する可能性があります。

現時点の主要エントリ（安定参照）:
| エントリ | 説明 |
|---|---|
| common/ | 共有テンプレート（例: リージョン共通のベースリソース） |
| PlanX/ | シナリオ別テンプレートとプラン固有ドキュメント |
| doc/ | 可視化・分析用ページ |
| doc/scripts/ | マトリクスや相関出力の生成スクリプト |
| memo_to_add.md | メモと今後の変更案 |

テンプレート一覧や依存関係の最新情報は以下を参照してください:
| 用途 | リンク |
|---|---|
| テンプレート一覧・件数・分布 | [doc/yaml-quick-matrix.html](doc/yaml-quick-matrix.html) |
| テンプレート相関・詳細表示 | [doc/display-yaml.html](doc/display-yaml.html) |

この README は要約レベルの情報に限定し、テンプレート単位の詳細テーブルは HTML 側で管理します。

## ✅ YAML クイックマトリクス（全件確認）

テンプレートごとの実装状況・サービス分布・件数は、以下で最新状態を確認できます。

| 項目 | リンク |
|---|---|
| YAML クイックマトリクス | [doc/yaml-quick-matrix.html](doc/yaml-quick-matrix.html) |
| YAML 詳細表示 | [doc/display-yaml.html](doc/display-yaml.html) |

## 🚀 使用方法

### 基本デプロイメント
| 対象 | コマンド |
|---|---|
| 共通リソースのデプロイ | `aws cloudformation create-stack --stack-name common-resources --template-body file://common/apse2/[resource].yaml` |
| 個別プランのデプロイ | `aws cloudformation create-stack --stack-name plan1-resources --template-body file://Plan1/[template].yaml` |

### 前提条件
| 項目 | 内容 |
|---|---|
| [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) | 適切な認証情報で設定済み |
| [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) | サーバーレステンプレート用 |
| [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) | Python自動化スクリプト用 |
| IAM アクセス許可 | EC2、S3、IAM、CloudWatchリソースの作成・管理権限 |

## 📊 プロジェクト統計
| 指標 | 値 |
|---|---|
| YAML とリソース件数 | [doc/yaml-quick-matrix.html](doc/yaml-quick-matrix.html) で動的生成 |
| サービス分布 | [doc/yaml-quick-matrix.html](doc/yaml-quick-matrix.html) で動的生成 |
| リージョン | ap-southeast-2（メイン、シドニー）, ap-northeast-1（レプリケーション、東京） |
| 自動化スクリプト | Python (boto3), PowerShell |

---

**注記:** 各プランフォルダには、具体的な実装手順と設定詳細を記載した詳細 README.md があります。
