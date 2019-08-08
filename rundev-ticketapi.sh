#!/bin/bash

TKT_API="https://us-central1-bonsai-interview-endpoints.cloudfunctions.net/movieTickets?skip=0&limit=1000"
JSONFILE="${PWD}/tickets_db.json"

echo "Starting Tickets API data request"
echo " - from: ${TKT_API}"
echo " - to  : ${JSONFILE}"

curl -o $JSONFILE $TKT_API

if [ $? -eq 0 ]; then
    echo "DONE!"
else
    echo "FAIL!"
fi

