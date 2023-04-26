import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
} from '@aws-sdk/client-s3';

const s3Client = new S3Client({region: 'us-west-2'});

export const handler = async(event) => {
    
    console.log(event)
    const bucketName = event.Records[0].s3.bucket.name
    const fileName = event.Records[0].s3.object.key
    const fileSize = event.Records[0].s3.object.size
    
    console.log('Bucket Name: ', bucketName);
    console.log('FileName(Bucket Key): ', fileName);
    console.log('File Size: ', fileSize);
    
    const getImageManifest = {
        Bucket: bucketName,
        //Key is used to get a specific file
        Key: 'images.json',
    }
    
    let input = {
        Body: '',
        Bucket: bucketName,
        Key: 'images.json',
        Metadata: {
            name: fileName,
            size: fileSize,
        }
    }
    
    let newArr = [];
    newArr.push(input.Metadata);
    input.Body = JSON.stringify(newArr);
    input.Metadata = JSON.stringify(input.Metadata)
    
    try{
    // Download a file called “images.json” from the S3 Bucket if it exists
    
    const manifest = await s3Client.send(new GetObjectCommand(getImageManifest));
    console.log(manifest);
    
    await s3Client.send(new PutObjectCommand(input));
    }
    
    catch(e){
        console.log(e);
        if (e.Code === 'NoSuchKey') {
            await s3Client.send(new PutObjectCommand(input));
        }
    }
    
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
