# image-lambda
AWS Lambda allows writing code that is triggered in the cloud, without thinking about maintaining servers. We’ll use it today to automatically run some processing on image files after they’re uploaded to an S3 Bucket.

## How to use my Lambda:

1. Copy and paste the code from `index.js` to your lambda index.mjs
2. Follow the AWS instruction to set up a Trigger
3. Once the code is deployed, when an image is uploaded in the designated folder, an updated images.json will be in the root folder available to download

### Issues Encountered

1. Trigger destination pre-fix was re-dundant so the code appeared to be broken
2. STRINGFY the contents of the requests!

### A link to my images.json file

[File](https://class16-practice.s3.us-west-2.amazonaws.com/images.json)
