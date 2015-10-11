#!/bin/bash          
docker run -d -p 2113:2113 -p 1113:1113 --volumes-from datacontainer --name eventstore eventstore_image
