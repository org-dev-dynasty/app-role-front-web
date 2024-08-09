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

    const oac = new cdk.aws_cloudfront.CfnOriginAccessControl(this, 'AppRoleFrontOAC', {
      originAccessControlConfig: {
        originAccessControlOriginType: 's3',
        signingBehavior: 'always',
        name: 'AppRoleFrontOAC',
        signingProtocol: 'sigv4',
      },
    }
  )

    const distribution = new cdk.aws_cloudfront.Distribution(this, 'AppRoleFrontDistribution', {
      defaultBehavior: {
        origin: new cdk.aws_cloudfront_origins.S3Origin(s3AssetsBucket, {
          originId: oac.ref
        }),
        allowedMethods: cdk.aws_cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: cdk.aws_cloudfront.CachedMethods.CACHE_GET_HEAD,
        viewerProtocolPolicy: cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cdk.aws_cloudfront.CachePolicy.CACHING_OPTIMIZED,
      }
    })

    distribution.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);
    const cfnDistro = distribution.node.defaultChild as cdk.aws_cloudfront.CfnDistribution;

    cfnDistro.addPropertyOverride('DistributionConfig.Origins.0.OriginAccessIdentity', oac.ref);
    

    s3AssetsBucket.addToResourcePolicy(new cdk.aws_iam.PolicyStatement({
      effect: cdk.aws_iam.Effect.ALLOW,
      actions: ['s3:GetObject'],
      resources: [s3AssetsBucket.arnForObjects('*')],
      principals: [new cdk.aws_iam.ServicePrincipal('cloudfront.amazonaws.com')],
    }));

    new cdk.CfnOutput(this, 'AppRoleFrontDistributionOutput', {
      value: distribution.distributionDomainName,
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