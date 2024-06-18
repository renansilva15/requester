#!/bin/bash

time=15

echo "Waiting for $time seconds before run the migrations and start the application..."

sleep $time

npm run start
