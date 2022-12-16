import json
import os
import boto3

#dynamodb = boto3.resource('dynamodb')
dynamodb = boto3.session.Session(profile_name=os.environ.get('AWS_PROFILE')).resource('dynamodb')
table = dynamodb.Table('battle-royale')

items = []

with open('items.json', 'r') as f:
    for row in f:
        items.append(json.loads(row))

with table.batch_writer() as batch:
    for item in items:
        batch.put_item(Item=item)
