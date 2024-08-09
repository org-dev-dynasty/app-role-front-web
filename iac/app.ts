import * as cdk from 'aws-cdk-lib';
import { IacStack } from './iac/iac_stack';

const awsAccountId = process.env.AWS_ACCOUNT_ID;
const awsRegion = process.env.AWS_REGION;

const tags = {
  project: 'app-role-front',
  stack: 'app-role-front',
  owner: 'Dev Dynasty Solutions',
}

const app = new cdk.App();
new IacStack(app, 'AppRoleFrontStack', {
  env: {
    account: awsAccountId,
    region: awsRegion,
  },
  tags: tags,
});

app.synth();