#!/bin/bash

docker run -d --rm \
	--name bonsai-mongo \
	--hostname bonsai-mongo \
	-p 27017:27017 \
	mongo:4.0 --storageEngine wiredTiger --bind_ip_all
