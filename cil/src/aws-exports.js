// src/aws-exports.js

const awsmobile = {
    "aws_project_region": "us-east-1", // Your AWS region
    "aws_cognito_identity_pool_id": "us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX", // Your Cognito Identity Pool ID
    "aws_cognito_region": "us-east-1", // Your Cognito Region
    "aws_user_pools_id": "us-east-1_XXXXXXXXX", // Your User Pool ID
    "aws_user_pools_web_client_id": "XXXXXXXXXXXXXXXXXXXXXXXXXX", // Your App Client ID
    "oauth": {},
    "aws_appsync_graphqlEndpoint": "https://XXXXXXXXXXXXXX.appsync-api.us-east-1.amazonaws.com/graphql", // Your AppSync GraphQL endpoint
    "aws_appsync_region": "us-east-1", // Your AppSync region
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
    "aws_user_files_s3_bucket": "your-s3-bucket-name", // Your S3 bucket name
    "aws_user_files_s3_bucket_region": "us-east-1" // Your S3 bucket region
};

export default awsmobile;
