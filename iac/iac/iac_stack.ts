import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const s3AssetsBucket = new cdk.aws_s3.Bucket(this, 'AppRoleFrontS3AssetsBucket', {
      bucketName: 'app-role-front-assets-bucket',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
    })

    const distribution = new cdk.aws_cloudfront.CloudFrontWebDistribution(this, 'AppRoleFrontDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: s3AssetsBucket,
          },
          behaviors: [
            {
              isDefaultBehavior: true,
            }
          ]
        }
      ],
    })

    distribution.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);

    new cdk.CfnOutput(this, 'AppRoleFrontDistributionOutput', {
      value: distribution.distributionDomainName,
      description: 'The distribution domain',
      exportName: 'AppRoleFrontDistributionOutput'
    });

    new cdk.CfnOutput(this, 'AppRoleFrontS3AssetsBucketOutput', {
      value: s3AssetsBucket.bucketName,
      description: 'The S3 bucket name',
      exportName: 'AppRoleFrontS3AssetsBucketOutput'
    });
    
    
  }
}