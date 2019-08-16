#!/bin/bash

OMDBAPI_URL="http://www.omdbapi.com/?apikey=PlzBanMe&plot=full"
SEARCH_BY_ID="&i=tt0054389"
SEARCH_BY_TITLE="&t=Shoot+the+Piano+Player"

echo
echo "Starting OMDB API data request"
echo

echo " by title"
FULL_URL=${OMDBAPI_URL}${SEARCH_BY_TITLE}
JSONFILE="${PWD}/samples/movies_db.json"
echo " - from: ${FULL_URL}"
echo " - to  : ${JSONFILE}"
curl -o $JSONFILE $FULL_URL
echo
if [ $? -eq 0 ]; then
    echo "DONE!"
else
    echo "FAIL!"
fi
echo

echo " by imdbID"
FULL_URL=${OMDBAPI_URL}${SEARCH_BY_ID}
JSONFILE="${PWD}/samples/movie_db.json"
echo " - from: ${FULL_URL}"
echo " - to  : ${JSONFILE}"
curl -o $JSONFILE $FULL_URL
echo

if [ $? -eq 0 ]; then
    echo "DONE!"
else
    echo "FAIL!"
fi
echo

