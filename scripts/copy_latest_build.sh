#!/bin/bash

# Get the current user's home directory
USER_HOME=$(eval echo ~$USER)

# Path to DerivedData
DERIVED_DATA_PATH="$USER_HOME/Library/Developer/Xcode/DerivedData"

# Get the latest modified directory in DerivedData
LATEST_DIR=$(ls -t "$DERIVED_DATA_PATH" | grep -v '^\..*' | head -n 1)

if [ -z "$LATEST_DIR" ]; then
    echo "No directories found in DerivedData"
    exit 1
fi

# Source path for Leap.app
SOURCE_PATH="$DERIVED_DATA_PATH/$LATEST_DIR/Build/Products/Debugging-iphonesimulator/Leap.app"

# Destination path in config/apps
DEST_PATH="$(pwd)/config/apps/Leap.app"

# Check if source exists
if [ ! -d "$SOURCE_PATH" ]; then
    echo "Source app not found at: $SOURCE_PATH"
    exit 1
fi

# Create apps directory if it doesn't exist
mkdir -p "$(pwd)/config/apps"

# Remove existing app if it exists
if [ -d "$DEST_PATH" ]; then
    rm -rf "$DEST_PATH"
fi

# Copy the app
echo "Copying latest build from: $SOURCE_PATH"
echo "To: $DEST_PATH"
cp -R "$SOURCE_PATH" "$DEST_PATH"

if [ $? -eq 0 ]; then
    echo "Successfully copied the latest build!"
else
    echo "Failed to copy the build"
    exit 1
fi 