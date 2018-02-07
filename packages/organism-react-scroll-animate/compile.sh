#!/bin/sh

conf='{ "assetsRoot": "./assets/" }'

production(){
    echo "Production Mode";
    npm run build
    CONFIG=$conf NODE_ENV=production webpack -p 
}

develop(){
    echo "Develop Mode";
    npm run build
    CONFIG=$conf webpack
}

case "$1" in
  p)
    production
    ;;
  *)
    develop
    exit
esac

exit $?
