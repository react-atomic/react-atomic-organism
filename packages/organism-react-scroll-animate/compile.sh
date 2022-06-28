#!/usr/bin/env bash

DIR=$(
  cd "$(dirname "$0")"
  pwd -P
)
cd $DIR
SWJS=${DIR}/service-worker.js
webpackEnabled=$(awk -F "=" '/^webpackEnabled/ {print $2}' $DIR/.yo)

conf='{'
conf+='"assetsRoot":"./assets/",'
conf+='"externals":{},'
conf+='"indexTpl":"'${DIR}/index.tpl'",'
conf+='"indexHtml":"'${DIR}/index.html'",'
conf+='"swDest":"'${SWJS}'",'
# conf+='"swDebug":true,'
conf+='"hotPort": "'${hotPort:-3088}'"'
conf+='}'

OPEN=$(which xdg-open 2> /dev/null)
if [ -z "$OPEN" ]; then
  OPEN="open"
fi

if [ "x$webpackEnabled" == "xon" ]; then
  webpack='npm run webpack --'
fi

checkBabel() {
  if [ ! -e ".babelrc" ] && [ ! -e "../../packages" ]; then
    if [ -e ${DIR}/node_modules/reshow-app/.babelrc ]; then
      cp ${DIR}/node_modules/reshow-app/.babelrc ${DIR}/.babelrc
    fi
  fi
}

killBy() {
  ps -eo pid,args | grep $1 | grep -v grep | awk '{print $1}' | xargs -I{} kill -9 {}
}

stop() {
  killBy ${DIR}/node_modules/.bin/babel
  if [ ! -z "$webpack" ]; then
    cat webpack.pid | xargs -I{} kill -9 {}
    npm run clean:webpack
  fi
  rm $SWJS
  echo "Stop done"
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

production() {
  stop
  echo "Production Mode"
  checkBabel
  npm run build
  if [ ! -z "$webpack" ]; then
    ENABLE_SW=1 CONFIG=$conf NODE_ENV=production $webpack
  fi
}

analyzer() {
  stop
  echo "Analyzer Mode"
  checkBabel
  npm run build
  [ ! -z "$webpack" ] && CONFIG=$conf BUNDLE='{}' $webpack
}

develop() {
  stop
  echo "Develop Mode"
  checkBabel
  npm run build
  [ ! -z "$webpack" ] && CONFIG=$conf $webpack
}

watch() {
  stop
  echo "Watch Mode"
  checkBabel
  npm run build:es:ui -- --watch &
  npm run build:es:src -- --watch &
}

hot() {
  stop
  rm $SWJS
  echo "Hot Mode"
  checkBabel
  npm run build:es:ui -- --watch &
  npm run build:es:src -- --watch &
  [ ! -z "$webpack" ] && sleep 10 && HOT_UPDATE=1 CONFIG=$conf $webpack serve &
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
  stop)
    stop
    ;;
  *)
    develop
    exit
    ;;
esac

exit $?
