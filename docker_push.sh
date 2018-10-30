#!/bin/bash
docker build -t slavalab/be-dice .
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push slavalab/be-dice
