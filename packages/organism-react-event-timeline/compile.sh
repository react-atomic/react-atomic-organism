#!/bin/bash

DIR=$( cd "$(dirname "$0")" ; pwd -P )
cd $DIR
SWJS=${DIR}/service-worker.js

conf='{'
conf+='"assetsRoot":"/assets/",'
conf+='"externals":{},'
conf+='"indexTpl":"'${DIR}/index.tpl'",'
conf+='"indexHtml":"'${DIR}/index.html'",'
conf+='"swDest":"'${SWJS}'",'
# conf+='"swDebug":true,'
conf+='"hotPort": "'${hotPort:-3088}'"'
conf+='}'

OPEN=$(which xdg-open 2>/dev/null)
if [ -z "$OPEN" ]; then 
  OPEN="open"
fi

if [ "xon" == "xon" ]; then
  webpack='npm run webpack --'
fi

checkBabel(){
  if [ ! -e ".babelrc" ] && [ ! -e "../../packages" ]; then
    if [ -e ${DIR}/node_modules/reshow-app/.babelrc ]; then
      cp ${DIR}/node_modules/reshow-app/.babelrc ${DIR}/.babelrc
    fi
  fi
}

killBy(){
    ps -eo pid,args | grep $1 | grep -v grep | awk '{print $1}' | xargs -I{} kill -9 {}
}

stop(){
    killBy ${DIR}/node_modules/.bin/babel 
    cat webpack.pid | xargs -I{} kill -9 {}
    npm run clean
    rm $SWJS
    echo "Stop done";
}

stopServer(){
  killBy ${DIR}/node_modules/.bin/ws
  echo "stop server done";
}

startServer(){
    stopServer
    yarn
    if [ ! -e "build" ]; then
        develop
    fi
    port=${port-3000}
    echo "Start server";
    if [ "$1" == "open" ]; then
        npm run start -- -p $port &
        sleep 3 
        $OPEN http://localhost:$port        
    else
        npm run start -- -p $port -v
    fi
}

production(){
    stop
    echo "Production Mode";
    checkBabel
    npm run build
    ENABLE_SW=1 CONFIG=$conf NODE_ENV=production $webpack
}

analyzer(){
    stop
    echo "Analyzer Mode";
    checkBabel
    npm run build
    CONFIG=$conf BUNDLE='{}' $webpack
}

develop(){
    stop
    echo "Develop Mode";
    checkBabel
    npm run build
    CONFIG=$conf $webpack
}

watch(){
    stop 
    echo "Watch Mode";
    checkBabel
    npm run build:es:ui -- --watch &
    npm run build:es:src -- --watch &
    sleep 10 
    CONFIG=$conf $webpack --watch &
}

watchTest(){
    stop 
    echo "Watch Test";
    checkBabel
    npm run build:cjs:ui -- --watch &
    npm run build:cjs:src -- --watch &
}

hot(){
    stop
    rm $SWJS 
    echo "Hot Mode";
    checkBabel
    npm run build:es:ui -- --watch &
    npm run build:es:src -- --watch &
    sleep 5
    HOT_UPDATE=1 CONFIG=$conf $webpack serve &
}

case "$1" in
  p)
    production
    ;;
  a)
    analyzer 
    ;;
  s)
    startServer $2
    ;;
  ss)
    stopServer
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
