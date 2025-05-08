#!/bin/bash

# Create the UI components directory if it doesn't exist
mkdir -p src/components/ui

# Fix permissions
chmod -R 755 node_modules
chmod -R 755 src/components/ui

echo "Permissions fixed successfully!"
