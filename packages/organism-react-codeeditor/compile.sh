#!/bin/sh

killBy(){
    ps auxwwww | grep $1 | grep -v grep | awk '{print $2}' | xargs -I{} kill -9 {}
}

stop(){
    DIR="$( cd "$(dirname "$0")" ; pwd -P )"
    killBy ${DIR}/node_modules/.bin/babel
}

watch(){
    stop
    npm run build:es:ui -- --watch &
    npm run build:es:src -- --watch &
}

develop(){
    echo "Develop Mode";
    npm run build
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
