import Plan2.apse2.lambda.data_modification as data_modification

def lambda_handler(event, context):
    
    data_modification.handler(event, context)
    
    # Your code here
    return {
        'statusCode': 200,
        'body': 'Hello from Lambda!'
    }