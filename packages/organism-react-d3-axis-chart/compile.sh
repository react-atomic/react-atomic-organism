#!/bin/sh

production(){
    echo "Production Mode";
    NODE_ENV=production webpack -p 
}

develop(){
    echo "Develop Mode";
    npm run build
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
