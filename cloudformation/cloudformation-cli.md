aws cloudformation create-stack --stack-name vpc01 --template-body file://vpc-create.yml

# Wait on stack creation
aws cloudformation wait stack-create-complete --stack-name vpc01

# Describe/list stacks
aws cloudformation describe-stacks

# Update stack
aws cloudformation update-stack --stack-name vpc01 --template-body file://vpc-create.yml

# Wait on stack update
aws cloudformation wait stack-update-complete --stack-name vpc01

# Delete stack
aws cloudformation delete-stack --stack-name vpc01