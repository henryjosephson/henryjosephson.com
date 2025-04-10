#!/bin/bash

# newsletter-test-mode.sh - Toggle TEST_MODE for the newsletter-sender Lambda function
# Usage: ./newsletter-test-mode.sh [true|false]

# Validate argument
if [ $# -ne 1 ] || { [ "$1" != "true" ] && [ "$1" != "false" ]; }; then
    echo "Usage: $0 [true|false]"
    exit 1
fi

NEW_MODE="$1"
FUNCTION_NAME="newsletter-sender"

echo "Setting TEST_MODE to $NEW_MODE for $FUNCTION_NAME..."

# Get current environment variables
echo "Retrieving current configuration..."
CURRENT_ENV=$(aws lambda get-function-configuration \
    --function-name "$FUNCTION_NAME" \
    --query "Environment.Variables" \
    --output json)

if [ $? -ne 0 ]; then
    echo "Error: Failed to retrieve Lambda configuration"
    exit 1
fi

# Update TEST_MODE in environment variables
echo "Updating configuration..."
UPDATED_ENV=$(echo "$CURRENT_ENV" | jq --arg mode "$NEW_MODE" '. + {"TEST_MODE": $mode}')

# Apply changes to Lambda function
echo "Applying changes..."
aws lambda update-function-configuration \
    --function-name "$FUNCTION_NAME" \
    --environment "{\"Variables\": $UPDATED_ENV}" > /dev/null

if [ $? -eq 0 ]; then
    echo "✅ TEST_MODE successfully set to $NEW_MODE for $FUNCTION_NAME"
    echo ""
else
    echo "❌ Failed to update Lambda function configuration"
    echo ""
    exit 1
fi