#!/bin/sh
DIR="$( cd "$(dirname "$0")" ; pwd -P )"
webpack='npm run webpack --'

conf='{ "assetsRoot": "./assets/" }'

killBy(){
    echo "kill $1"
    ps auxwwww | grep $1 | grep -v grep | awk '{print $2}' | xargs -I{} kill -9 {}
}

stop(){
    killBy ${DIR}/node_modules/.bin/babel 
    cat webpack.pid | xargs -I{} kill -9 {}
    npm run clean
}

startServer(){
    DIR="$( cd "$(dirname "$0")" ; pwd -P )"
    killBy ${DIR}/node_modules/.bin/ws
    yarn
    if [ -z "$port" ] ; then
        port=3000;
    fi
    echo "Start server";
    npm run start -- -p $port -v
}

watch(){
    stop 
    npm run build:es:ui -- --watch &
    npm run build:es:src -- --watch &
}

develop(){
    stop
    echo "Develop Mode";
    npm run build
    HOT_UPDATE=0 CONFIG=$conf $webpack
}

case "$1" in
  s)
    startServer 
    ;;
  watch)
    watch 
    ;;
  stop)
    stop 
    ;;
  *)
    develop
    exit
esac

exit $?
