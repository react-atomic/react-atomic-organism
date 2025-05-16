#!/usr/bin/env bash

DIR=$(
  cd "$(dirname "$0")"
  pwd -P
)
CHK_PHP=$(which php 2>/dev/null)
PHP_CONFIG=$DIR/cnfig/config.php
YO_CONFIG=$DIR/.yo
WEBPACK_SERVER_CONFIG="--config webpack.server.mjs"

cd $DIR
webpackEnabled=$([ -e "$YO_CONFIG" ] && awk -F "=" '/^webpackEnabled/ {print $2}' $YO_CONFIG)
serverEnabled=$([ -e "$YO_CONFIG" ] && awk -F "=" '/^serverEnabled/ {print $2}' $YO_CONFIG)
assetsRoot=$([ -e "$YO_CONFIG" ] && awk -F "=" '/^assetsRoot/ {print $2}' $YO_CONFIG)
HTDOCS=${DIR}$([ -e "$YO_CONFIG" ] && awk -F "=" '/^HTDOCS/ {print $2}' $YO_CONFIG)
SWJS=${HTDOCS}/service-worker.js
if [ ! -z "$CHK_PHP" ] && [ -s "$PHP_CONFIG" ]; then
  conf=`DUMP=cli php -r "include('$PHP_CONFIG');"`
else
  conf='{'
  conf+='"assetsRoot":"'${assetsRoot:-"./assets/"}'",'
  conf+='"externals":{},'
  if [ -z "$serverEnabled" ]; then
    conf+='"indexTpl":"'${DIR}/index.tpl'",'
    conf+='"indexHtml":"'${DIR}/index.html'",'
    conf+='"bustMode":"name",'
  fi
  conf+='"swDest":"'${SWJS}'",'
  # conf+='"swDebug":true,'
  conf+='"hotPort": "'${hotPort:-3088}'"'
  conf+='}'
fi
echo $conf;


OPEN=$(which xdg-open 2> /dev/null)
if [ -z "$OPEN" ]; then
  OPEN="open"
fi

if [ "x$webpackEnabled" == "xon" ]; then
  webpack='npm run webpack --'
fi

killBy() {
  ps -eo pid,args | grep $1 | grep -v grep | awk '{print $1}' | xargs -I{} kill -9 {}
}

stopServer() {
  killBy ${DIR}/node_modules/.bin/ws
  echo "stop server done"
}

startServer() {
  stopServer
  yarn
  if [ ! -e "build" ]; then
    develop
  fi
  port=${port-3000}
  echo "Start server"
  if [ "$1" == "open" ]; then
    npm run start -- -p $port &
    sleep 3
    $OPEN http://localhost:$port
  else
    npm run start -- -p $port -v
  fi
}

stop() {
  killBy ${DIR}/node_modules/.bin/babel
  if [ ! -z "$webpack" ]; then
    cat webpack.pid | xargs -I{} kill -9 {}
    npm run clean:webpack
    rm $HTDOCS/workbox-*.js
  fi
  [ -e "$SWJS" ] && rm $SWJS
  echo "Stop done"
}

production() {
  stop
  echo "Production Mode"
  npm run build
  if [ ! -z "$webpack" ]; then
    ENABLE_SW=1 CONFIG=$conf NODE_ENV=production $webpack
    if [ ! -z "$serverEnabled" ]; then
      ENABLE_SW=1 CONFIG=$conf NODE_ENV=production $webpack $WEBPACK_SERVER_CONFIG
    fi
  fi
}

analyzer() {
  stop
  echo "Analyzer Mode"
  npm run build
  [ ! -z "$webpack" ] && CONFIG=$conf BUNDLE='{}' $webpack
}

develop() {
  stop
  echo "Develop Mode"
  npm run build
  [ ! -z "$webpack" ] && CONFIG=$conf $webpack && [ ! -z "$serverEnabled" ] && CONFIG=$conf $webpack $WEBPACK_SERVER_CONFIG
}

watch() {
  echo "Watch Mode"
  npm run build:es -- --watch &
}

hot() {
  stop
  echo "Hot Mode"
  npm run build:es -- --watch &
  [ ! -z "$webpack" ] && sleep 10 && HOT_UPDATE=1 CONFIG=$conf $webpack serve &
}

nodeTest(){
    theme=$1
    if [ -z "$theme" ]; then
      theme="Hello"
    fi
    echo "Theme Path: ${theme}"
    echo '{"themePath":"'${theme}'"}' | node ./server.js
    echo ""
}

case "$1" in
  node)
    nodeTest $2
    ;;
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
  stop)
    stop
    ;;
  *)
    develop
    exit 0
    ;;
esac

exit $?
