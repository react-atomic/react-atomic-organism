#!/bin/sh

develop(){
    echo "Develop Mode";
    npm run build
}

killBy(){
    ps auxwwww | grep $1 | grep -v grep | awk '{print $2}' | xargs -I{} kill -9 {}
}

stop(){
    DIR="$( cd "$(dirname "$0")" ; pwd -P )"
    killBy ${DIR}/node_modules/.bin/babel 
}

watch(){
    stop 
    echo "Watch Mode";
    npm run build:cjs:ui -- --watch &
    npm run build:cjs:src -- --watch &
    npm run build:es:ui -- --watch &
    npm run build:es:src -- --watch &
}

case "$1" in
  watch)
    watch 
    ;;
  stop)
    stop 
    ;;
  *)
    develop
    ;; 
esac

exit $?
