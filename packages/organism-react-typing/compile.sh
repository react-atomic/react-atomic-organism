#!/bin/sh

conf='{ "assetsRoot": "./assets/" }'

PWD=`dirname $0`
cd $PWD
webpack='npm run webpack --'

analyzer(){
    echo "Analyzer Mode";
    npm run build
    CONFIG=$conf BUNDLE='{}' $webpack --display-used-exports
}

develop(){
    stop
    echo "Develop Mode";
    npm run build
    CONFIG=$conf $webpack
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

killBy(){
    echo "kill $1"
    ps auxwwww | grep $1 | grep -v grep | awk '{print $2}' | xargs -I{} kill -9 {}
}

stop(){
    DIR="$( cd "$(dirname "$0")" ; pwd -P )"
    killBy ${DIR}/node_modules/.bin/babel 
    cat webpack.pid | xargs -I{} kill -9 {}
    npm run clean
}

watch(){
    stop 
    npm run build:es:ui -- --watch &
    npm run build:es:src -- --watch &
    sleep 10 
    CONFIG=$conf $webpack --watch &
}


hot(){
    stop 
    npm run build:es:ui -- --watch &
    npm run build:es:src -- --watch &
    HOT_UPDATE=1 CONFIG=$conf $webpack serve &
}

case "$1" in
  a)
    analyzer 
    ;;
  s)
    startServer 
    ;;
  hot)
    hot
    ;;
  watch)
    watch 
    ;;
  watchTest)
    watchTest
    ;;
  stop)
    stop 
    ;;
  *)
    develop
    exit
esac

exit $?
