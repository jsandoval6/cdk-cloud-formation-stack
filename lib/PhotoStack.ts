import * as cdk from 'aws-cdk-lib';
import { CfnOutput, Fn, RemovalPolicy } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotoStack extends cdk.Stack {
    private stackSufix: string;
    public readonly photosBucketArn: string

    constructor ( scope: Construct, id: string, props?: cdk.StackProps ) {
        super( scope, id, props );
        this.initializeSuffix();

        const photosBucket = new Bucket( this, 'PhotosBucket', {
            bucketName: `photos-bucket-${ this.stackSufix }`,
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        } );

        //    (photosBucket.node.defaultChild as CfnBucket).overrideLogicalId('PhotosBucket2sakl')
        
        // new CfnOutput( this, 'photos-bucket', {
        //     value: photosBucket.bucketArn,
        //     exportName: 'photos-bucket'
        // })

        this.photosBucketArn = photosBucket.bucketArn;
    }

    private initializeSuffix () {
        const shortStackId = Fn.select( 2, Fn.split( '/', this.stackId ) );
        this.stackSufix = Fn.select( 4, Fn.split( '-', shortStackId ) );
    }
}