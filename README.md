# Getting Started

1. Install the [AWS CLI](https://awscli.amazonaws.com/AWSCLIV2.msi).
1. Configure a profile called **CustomerServices** with the `aws configure --profile CustomerServices` command. This name can be anything, but if you change it, before to update profile references in the `serverless.yml` file.
1. Install the [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/).
1. Run `serverless deploy -stage prod` to create your resources.

Every day, Lambda will backup to S3. 60 days worth of backups are kept by default. If you want to change this, update the **LifecycleConfiguration** property in `serverless.yml`.