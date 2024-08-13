import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Distribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const s3AssetsBucket = new cdk.aws_s3.Bucket(this, 'AppRoleFrontS3AssetsBucket', {
      bucketName: 'app-role-front-assets-bucket',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL,
      cors: [
        {
          allowedOrigins: ['*'],
          allowedMethods: [cdk.aws_s3.HttpMethods.GET, cdk.aws_s3.HttpMethods.HEAD],
          allowedHeaders: ['*'],
          exposedHeaders: ['Access-Control-Allow-Origin'],
        }
      ]
    })

    const originAccessIdentity = new OriginAccessIdentity(this, 'AppRoleFrontOAI', {
      comment: 'OAI for S3 bucket',
    });

    const distribution = new Distribution(this, 'AppRoleFrontDistribution', {
      defaultBehavior: {
        origin: new cdk.aws_cloudfront_origins.S3Origin(s3AssetsBucket, {
          originAccessIdentity: originAccessIdentity,
        }),
        allowedMethods: cdk.aws_cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: cdk.aws_cloudfront.CachedMethods.CACHE_GET_HEAD,
        viewerProtocolPolicy: cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cdk.aws_cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
    });

    distribution.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);

    s3AssetsBucket.addToResourcePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['s3:GetObject'],
      resources: [s3AssetsBucket.arnForObjects('*')],
      principals: [new ServicePrincipal('cloudfront.amazonaws.com', {
        conditions: {
          StringEquals: {
            'AWS:SourceArn': `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
          },
        },
      })],
    }));

    

    new cdk.CfnOutput(this, 'AppRoleFrontDistributionOutput', {
      value: distribution.domainName,
      description: 'The distribution domain',
      exportName: 'AppRoleFrontDistributionOutput'
    });

    new cdk.CfnOutput(this, 'AppRoleFrontCfnDistroIdOutput', {
      value: distribution.distributionId,
      description: 'The distribution ID',
      exportName: 'AppRoleFrontCfnDistroIdOutput'
    });

    new cdk.CfnOutput(this, 'AppRoleFrontS3AssetsBucketOutput', {
      value: s3AssetsBucket.bucketName,
      description: 'The S3 bucket name',
      exportName: 'AppRoleFrontS3AssetsBucketOutput'
    });
    
    
  }
}