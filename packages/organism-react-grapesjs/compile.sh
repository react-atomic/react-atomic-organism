#!/bin/sh

develop(){
    echo "Develop Mode";
    npm run build
}

server(){
    port=${1-3000}
    echo "Start server";
    node_modules/.bin/ws -p $port -v 
}

case "$1" in
  s)
    server $2
    ;;
  *)
    develop
esac

exit $?
